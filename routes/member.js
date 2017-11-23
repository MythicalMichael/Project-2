const express = require("express");
const User = require("../models/user");
const mongoose = require('mongoose');
const router = express.Router();

router.get("/profile/:userId", (req, res, next) => {
    console.log("myuser",req.user);
    User.findOne({_id: req.user}, (err, user) => {

            if (err) {
                next(err);
            } else {
                res.render("profile",{user})

            }

        }

    )




})

module.exports = router;