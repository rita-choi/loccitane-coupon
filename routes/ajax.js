var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
var msg = req.LoccitaneCoupon.json();
res.render('/', {
  msg: msg
});
console.log(msg);
});


module.exports = router;
