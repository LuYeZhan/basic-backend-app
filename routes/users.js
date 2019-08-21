const express = require('express');
const router = express.Router();

const Talk = require('../models/Talk');

// const {
//   isLoggedIn
// } = require('../helpers/middlewares');

router.get('/profile', async (req, res, next) => {
  try {
    const userId = req.session.currentUser;
    const talk = await Talk.find({ creator: userId });
    res.status(200).json(talk);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const talk = await Talk.find({});
    res.status(200).json(talk);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
