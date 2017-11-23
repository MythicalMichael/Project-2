const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Group = require("../models/group");

const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// --- SIGNUP ---

router.get("/signup", (req, res, next) => {
  const role = req.params.role;
  res.render("auth/signup", {
    role: role
  });
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  // gets the groupId if the user is a member (not admin)
  const groupId = req.body.groupId || undefined;

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
      // group added to make sense with the post above
      group: groupId
    });

    newUser.save((err, user) => {
      if (err) {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      } else {
        // if there is a groupId, the user is a member (admin has no groupId in this step)
        if (groupId) {
          // Adds the userId to the Array-of-users of the group he's joining to
          Group.findOneAndUpdate({_id: groupId}, {$push: {userIds: user._id}}, (err) => {
            if (err) next(err);
            return passport.authenticate('local')(req, res, function () {
              res.redirect('/');
            });
          });
        } else {
          passport.authenticate('local')(req, res, function () {
            res.redirect('/group/create-group/');
          });
        }
      }
    });
  });

});

// --- LOGIN ---

router.get("/welcome", (req, res, next) => {
  res.render("welcome");
});

router.post("/welcome", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/welcome",
  failureFlash: true,
  passReqToCallback: true
}));

// --- AUTHENTICATION

router.get("/private-page", ensureLogin.ensureLoggedIn("/welcome"), (req, res) => {
  res.render("private", {
    user: req.user
  });

});

// --- LOG OUT

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/welcome");
});

module.exports = router;