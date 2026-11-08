var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('juice', { title: 'Search Results Juice' });
});

module.exports = router;
