const express = require('express');
const router = express.Router();
const Group = require("../models/group");
const Task = require("../models/task");

/* GET home page. */

router.get('/', (req, res, next) => {
  //contains an object which is the user id. passport saves it
  const userId = req.user; 
  //looks for the group that contains the user as admin OR member
  Group.findOne({$or: [{adminId: userId}, {userIds: userId}]}, (err, group) => { 
    console.log(group) 
    if (err) return next(err);
      res.render('dashboard', {group});
  });
});

module.exports = router;
