var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/teachers');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/teachers.json')
  fs.writeFile(filePath, JSON.stringify(data))
};

var findLastId = function() {
  var lastTeacher = lodash.findLast(data.list);
  return lastTeacher.id;
}

router.get('/', function(req, res) {
  res.json(data.list);
});

router.get('/:id', function(req, res) {
  var idTeacher = req.params.id;
  var teacher = lodash.find(data.list, function(o) {
    return o.id.toString() === idTeacher.toString();
  });
  if(teacher === undefined)
  {
    res.status(404);
    res.send('404 error not found');
  }
  else
  {
    res.json(teacher);
  }
});

router.get('/search/:name', function(req,res) {
  var nameTeacher = req.params.name;
  var teachers = lodash.filter(data.list, function(o){
    return o.name.indexOf(nameTeacher) >= 0;
  });
  res.json(teachers);
});

router.post('/', function(req, res) {
  var newTeacher = req.body;
  newTeacher.id = findLastId() + 1;
  data.list.push(newTeacher);
  saveData(data);
  res.json(data.list);
});

module.exports = router;
