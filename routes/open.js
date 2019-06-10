var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/:cardId', function (req, res, next) {
    db.collection('users').where('id', '==', req.params.cardId).get().then(function (doc) {
        if (doc.docs.length == 0) {
            res.json({
                result: 'failed',
                content: 'user_not_found',
            });
        } else {
            res.json({
                result: 'ok',
                content: doc.docs[0].data().name,
            });
        }
    }).catch(function (err) {
        res.json({
            result: 'failed',
            content: 'dont_know',
        });
    });
});

module.exports = router;
