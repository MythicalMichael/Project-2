const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const Group = require("../models/group");
const ensureLogin = require("connect-ensure-login");

authRoutes.get("/create-group/:userId", ensureLogin.ensureLoggedIn("/welcome"),(req, res) => {
  const userId = req.params.userId;
  res.render("create-group", {userId: userId});
});

authRoutes.post("/creategroup", (req, res) => {
  const groupname = req.body.groupname;
  const description = req.body.description;
  const userId = req.body.userId;

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
      adminId: userId,
      tasks: [],
      userIds: [userId]
    });

  newGroup.save((err) => {
    if (err) {
      res.render("create-group", { message: "Something went wrong" });
      return;
    } else {
      res.redirect("/");
    }
  });
 });
})




module.exports = authRoutes;