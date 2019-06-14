var express = require('express');
var router = express.Router();
var io = require('../app');

router.get('/', function(req, res, next) {
  let hihi = parseInt(req.query.time);
  io.io.emit('free-open', {time: hihi});
  res.json({time: hihi, type: typeof hihi});
});

module.exports = router;
