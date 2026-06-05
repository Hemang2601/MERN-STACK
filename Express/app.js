const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mud26').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

var StudentModel = require('./Models/Student');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

app.get('/add-student-page', (req, res) => {
  res.sendFile(__dirname + '/savestudent.html'); 
});

app.get('/view-students-page', (req, res) => {
  res.sendFile(__dirname + '/getstudent.html'); 
});

app.post('/savestudent', (req, res) => {
  var studentdata = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender
  };

  var mydata = new StudentModel(studentdata);
  mydata.save()
    .then(() => {
      res.redirect('/view-students-page');
    })
    .catch((err) => {
      console.error("Error saving student data:", err);
      res.status(500).send("Error saving student data.");
    });
});

app.get('/getstudent', (req, res) => {
  StudentModel.find()
    .then(data => {
      res.json(data); 
    })
    .catch(err => {
      console.error("Error retrieving student logs:", err);
      res.status(500).send([]);
    });
});

app.post('/add-student', (req, res) => {
  StudentModel.create(req.body).then(()=> {
    res.json({status: "success", message: "Student added successfully"});
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}/`);
});