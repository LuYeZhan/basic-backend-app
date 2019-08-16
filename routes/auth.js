'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');

// en caso de que haya current user, lo envio
router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
      const user = await User.findOne({ username }, 'username');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass, email });
        // este de codigo de abajo es para loggear cuando haces sign up
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/profile/update',
  isLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { password } = req.body;
    const id = req.session.currentUser._id;
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const updatedUser = { ...user, password: hashPass };
    try {
      const updated = await User.findByIdAndUpdate(id, updatedUser, { new: true });

      req.session.currentUser = updated;
      console.log(updated);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  })
;

router.post('/logout', isLoggedIn(), (req, res, next) => {
  // es lo mismo que delete req.currentSession
  req.session.destroy();
  return res.status(204).send();
});

router.get('/home', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
