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
  const role = req.params.role;
  res.render("auth/signup", {
    role: role
  });
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = 'admin';

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate username, email and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The username already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      role,
    });

    newUser.save((err, user) => {
      if (err) {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      } else {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/group/create-group/');
        });
      }
    });
  });

});

// --- LOGIN ---

authRoutes.get("/welcome", (req, res, next) => {
  res.render("welcome");
});

authRoutes.post("/welcome", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/welcome",
  failureFlash: true,
  passReqToCallback: true
}));

// --- AUTHENTICATION

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn("/welcome"), (req, res) => {
  res.render("private", {
    user: req.user
  });

});

// --- LOG OUT

authRoutes.get("/logout", (req, res) => {
  // req.session.destroy();
  req.logout();
  res.redirect("welcome");
});

module.exports = authRoutes;