'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Talk = require('../models/talk');

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.post(
  '/create',
  isLoggedIn(),
  async (req, res, next) => {
    const { title, soundURL, tags } = req.body;
    const userId = req.session.currentUser;
    try {
      const newTalk = await Talk.create({
        title,
        soundURL,
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

router.get(
  '/:id',
  async (req, res, next) => {
    const talkId = req.params.id;
    try {
      const talk = await Talk.findOne({ _id: talkId });
      res.status(200).json(talk);
    } catch (error) {
      next(error);
    }
  });

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

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const userId = req.session.currentUser;
    const { id } = req.params;
    await User.findByIdAndUpdate(userId, { $pull: { talks: id } }, { new: true });
    await Talk.findByIdAndDelete(id);
    res.status(200).json({ message: 'eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
