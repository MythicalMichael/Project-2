const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const Group = require("../models/group");

authRoutes.get("/creategroup", (req, res) => {
  res.render("create-group");
})

authRoutes.post("/creategroup", (req, res, next) => {
  const groupname = req.body.groupname;
  const description = req.body.description;
  if (groupname === "") {
    res.render("create-group", {
      message: "Please give your group a name"
    });
    return;
  }

  Group.findOne({
    groupname
  }, "groupname", (err, group) => {
    if (group !== null) {
      res.render("create-group", {
        message: "This Group already exists"
      });
      return;
    }
  });
  const newGroup = new Group({
    groupname,
    description,
  });

  newGroup.save((err) => {
    if (err) {
      res.render("create-group", { message: "Something went wrong" });
    } else {
      res.redirect("/dashboard");
    }
  });
})




module.exports = authRoutes;