const express = require('express');
const router = express.Router();
const Group = require("../models/group");
const Task = require("../models/task");

/* GET home page. */

router.get('/', (req, res, next) => {
  const userId = req.session.passport.user;
  Group.findOne({$or: [{adminId: userId}, {userIds: userId}]}, (err, group) => {
      if (err) return next(err);
      res.render('dashboard', {group});
  });
});

module.exports = router;
