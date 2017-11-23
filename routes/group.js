const express = require("express");
const router = express.Router();
const passport = require("passport");
const Group = require("../models/group");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const mongoose = require('mongoose');

router.get("/create-group/", ensureLogin.ensureLoggedIn("/welcome"),(req, res) => {
  const userId = req.session.passport.user;
  res.render("create-group", {userId});
});

router.post("/creategroup", (req, res, next) => {
  const groupname = req.body.groupname;
  const description = req.body.description;
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
      userIds: [adminId]
    });

  newGroup.save((err, group) => {
    if (err) {
      res.render("create-group", { message: "Something went wrong" });
      return;
    } else {
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

router.get('/join/:groupId',(req, res) => {
  Group.findOne({_id: req.params.groupId}, (err, group) => {
    if (err) {
      next(err);
    } else {
      res.render("auth/signup-member", {group});
    }
  });
});

router.get("/mygroup/:groupId",(req,res)=>{
  console.log(req.params)
 Group.findOne({_id: req.params.groupId},(err,group)=>{
   if(err){
     next(err);
   } else {
     res.render("mygroup",{group});
   }
 })
})


module.exports =  router;