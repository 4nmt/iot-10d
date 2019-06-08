var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('TCL: req', req);
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message });
  }
});

router.post('/', async function(req, res, next) {
  try {
    console.log('TCL: req.body', req.body);
    const { name } = req.body;
    await User.create(
      {
        name
      },
      (err, user) => {
        if (err) throw err;
      }
    );
    res.status(200).json({ name });
    console.log(user);
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message });
  }
});

module.exports = router;
