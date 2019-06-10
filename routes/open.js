var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/:cardId', async function (req, res, next)  {
    let myArrs = await db.collection('users').get();

    let hihi = myArrs.docs.map(function (x) {
        return {
            id: x.data().id.toString().split('-'),
            name: x.data().name,
            isAccepted: x.data().isAccepted,
        };
    });

    console.log(hihi);

    if (myArrs.empty) {
        res.json({
            result: 'failed',
            content: 'user_not_found',
        });
    } else {
        res.json({
            result: 'ok',
            content: myArrs.docs[0].data().name
        });
    }
});

module.exports = router;
