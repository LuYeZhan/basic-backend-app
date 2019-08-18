const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Talk = require('../models/talk');

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.get('/profile', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('talks');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const talk = await Talk.find({});
    res.status(200).json(talk);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
