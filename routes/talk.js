const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Talk = require('../models/talk');

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.post(
  '/create',
//   isLoggedIn(),
  async (req, res, next) => {
    const { title, audio, tags } = req.body;
    const userId = req.session.currentUser;
    console.log(userId);
    try {
      const newTalk = await Talk.create({
        title,
        audio,
        tags,
        creator: userId
      });
      const talkId = newTalk._id;
      await User.findByIdAndUpdate(userId, { $push: { talks:
      talkId } });
      res.status(200).json(newTalk);
    } catch (error) {
      next(error);
    }
  });

// same route? I want to render in the same page
router.put(
  '/update/:id',
  isLoggedIn(),
  async (req, res, next) => {
    const talkId = req.params.id;
    const { title, tags } = req.body;
    try {
      const updated = await Talk.findByIdAndUpdate(talkId, { title, tags }, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
