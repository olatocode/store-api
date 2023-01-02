/** @format */
const User = require('../models/User');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

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

    // !user && res.status(401).json('wrong credentials!');
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc;
    originalPassword !== password;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
