/** @format */
const User = require('../models/User');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({
      username,
    });

    !user && res.status(401).json('wrong credentials!');

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const password = hashPassword.toString(CryptoJS.enc.Utf8);
    password !== password && res.status(401).json('wrong credentials!');

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
