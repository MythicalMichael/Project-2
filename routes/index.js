const express = require('express');
const router = express.Router();
const Group = require("../models/group");
const Task = require("../models/task");
const User = require("../models/user");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");


/* GET home page. */

router.get('/', ensureLogin.ensureLoggedIn("/welcome"),(req, res, next) => {

  const userId = req.user._id;
  Group.findOne({$or:[{adminId: userId}, {userIds: userId }]})
        .populate({
          path:"tasks",
          model:"Task"
        })
        .exec((err, group) => {
          User.findOne({_id: userId})
          .populate({
            path:"tasks",
            model:"Task"
          }).exec((err, user) => {
            if (err) {
              next(err);
            } else {
              res.render('dashboard', {user, group});
            }
        });
      });
});
  
module.exports = router;