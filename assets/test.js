var btn = document.getElementById('press');
var p = document.getElementById('p');

var resHandler = function(data) {
  console.log(data);
};

var errorHandler = function(err) {
  console.log(err);
};

jQuery.get('http://localhost/api/time', resHandler);
