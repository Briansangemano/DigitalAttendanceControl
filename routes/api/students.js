var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/students');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/students.json')
  fs.writeFile(filePath, JSON.stringify(data))
};

router.get('/', function(req, res) {
  res.json(data.list);
});

router.get('/:id', function(req, res) {
  var idstudent = req.params.id;
  var student = lodash.find(data.list, function(o) {
    return o.id.toString() === idstudent.toString();
  });
  if(student === undefined)
  {
    res.status(404);
    res.send('404 error not found');
  }
  else
  {
    res.json(student);
  }
});

router.get('/search/:name', function(req,res) {
  var nameStudent = req.params.name;
  var students = lodash.filter(data.list, function(o){
    return o.name.indexOf(nameStudent) >= 0;
  });
  res.json(students);
});

router.get('/search/:DNI', function(req,res) {
  var DNIstudent = req.params.name;
  var students = lodash.filter(data.list, function(o){
    return o.name.indexOf(DNIstudent) >= 0;
  });
  res.json(students);
});

router.post('/', function(req, res) {
  var newStudent = req.body;
  data.list.push(newStudent);
  saveData(data);
  res.json(data.list);
});

module.exports = router;
