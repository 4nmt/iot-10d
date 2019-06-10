var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    if(req.body.username == 'admin' && req.body.password == 'admin')
        res.redirect('../home');
    else
        res.render('index', { title: 'Đăng nhập', isLoginFailed: true});
});

module.exports = router;
