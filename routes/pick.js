var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Rendering random item template");
  res.render('randomitem', {title: 'A random item'});
  
});

module.exports = router;
