const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// --- SIGNUP ---

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

// --- LOGIN ---

authRoutes.get("/", (req, res, next) => {
  res.render("index");
});

authRoutes.post("/index", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

// --- AUTHENTICATION

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = authRoutes;