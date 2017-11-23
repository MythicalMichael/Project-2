const express = require('express');
const router = express.Router();
const Group = require("../models/group");
const Task = require("../models/task");
const User = require("../models/user");
/* GET home page. */

router.get('/', (req, res, next) => {

  const userId = req.user._id;
  const user = req.user;
  Group.findOne({$or:[{adminId: userId}, {userIds: userId }]}, (err, group) => {
      if (err) return next(err);
      console.log(group)
      res.render('dashboard', {user, group});


  });
});

module.exports = router;
