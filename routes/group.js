const express = require("express");
const router = express.Router();
const passport = require("passport");
const Group = require("../models/group");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const mongoose = require('mongoose');

router.get("/create-group/", ensureLogin.ensureLoggedIn("/welcome"),(req, res) => {
  // ejs creates group with a specific userId of the admin related
  const userId = req.session.passport.user;
  res.render("create-group", {userId});
});

router.post("/creategroup", (req, res, next) => {
  const groupname = req.body.groupname;
  const description = req.body.description;
  // 'const adminId' gets info from the logged-in user
  const adminId = req.body.adminId;

  if (groupname === "") {
    res.render("create-group", {
      message: "Please give your group a name"
    });
    return;
  }

  Group.findOne({ groupname }, "groupname", (err, group) => {

    if (group !== null) {
      res.render("create-group", {message: "This Group already exists"});
      return;
    }
    
    const newGroup = new Group({
      groupname,
      description,
      adminId: adminId,
      tasks: [],
      // 'adminId' is also a user even if the group has no members
      userIds: [adminId]
    });

  newGroup.save((err, group) => {
    if (err) {
      res.render("create-group", { message: "Something went wrong" });
      return;
    } else {
      // Once the group has been saved (created), looks for the admin in the users-collection
      // and adds him the groupId
      User.findOneAndUpdate({_id: adminId}, {$set: {group: group._id}}, (err) => {
         if (err) {
           next(err);
         } else {
           res.redirect("/");
         }
      });
    }
  });
 });
});

//signup for the member, comes from the link which has the id of the group he will join to in the params
router.get('/join/:groupId',(req, res) => {
  Group.findOne({_id: req.params.groupId}, (err, group) => {
    if (err) {
      next(err);
    } else {
      res.render("auth/signup-member", {group});
    }
  });
});

// router.get("/mygroup/:groupId",(req,res)=>{
//   console.log(req.params)
//  Group.findOne({_id: req.params.groupId},(err,group)=>{
//    if(err){
//      next(err);
//    } else {
//      res.render("mygroup",{group});
//    }
//  }).populate
// })

router.get("/mygroup/:groupId",(req,res)=>{
  const user = req.user;
Group.findOne({_id: req.params.groupId}).
populate({
    path:"userIds",
    model:"User",
    select:"username"
  }).
exec(function (err, group) {
  if (err) {
    next(err);
  } else {
    res.render("mygroup",{user, group});
  }
});
})

module.exports =  router;