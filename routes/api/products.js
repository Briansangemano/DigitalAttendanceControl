var express = require('express');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = require('../../data/products');
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, '../../data/products.json')
  fs.writeFile(filePath, JSON.stringify(data))
};

router.get('/', function(req, res) {
  res.json(data.list);
});

router.get('/:id', function(req, res) {
  var idproduct = req.params.id;
  var product = lodash.find(data.list, function(o) {
    return o.id.toString() === idproduct.toString();
  });
  if(product === undefined)
  {
    res.status(404);
    res.send('404 error not found');
  }
  else
  {
    res.json(product);
  }
});

router.get('/search/:name', function(req,res) {
  var nameProduct = req.params.name;
  var products = lodash.filter(data.list, function(o){
    return o.name.indexOf(nameProduct) >= 0;
  });
  res.json(products);
});

router.post('/', function(req, res) {
  var newProduct = req.body;
  data.list.push(newProduct);
  saveData(data);
  res.json(data.list);
});

module.exports = router;
