const express = require("express");
const User = require("../models/user");
const mongoose = require('mongoose');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

// router.get("/profile/:userId", (req, res, next) => {
//     console.log("myuser",req.user);
//     User.findOne({_id: req.user}, (err, user) => {

//             if (err) {
//                 next(err);
//             } else {
//                 res.render("profile",{user})

//             }
//         }
//     )
// })



router.get("/profile/me", (req, res, next) => {
  //Group needs to be populated
  const userId = req.user._id
    User.findOne({_id: userId}, (err, user) => {
        if (err) {
            next(err);
        } else {
            res.render("profile",{user})
        }
    });
});

router.get("/dashboard/:userId", (req, res, next) => {
  User.findOne({_id: req.params.userId})
    .populate({
      path: 'group',
      model: 'Group'
    }).populate({
      path:'tasks',
      model:'Task'
    }).exec((err, user) => {
      if (err) {
        next(err);
      } else {
        res.render("dashboard-member",{user})
        }
    });
});



module.exports = router;