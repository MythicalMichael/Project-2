const express = require("express");
const authRoutes= express.Router();

const Group = require("../models/group");

authRoutes.get("/creategroup",(req,res)=>{
  res.render("create-group");
})

authRoutes.post("/creategroup",(req,res,next)=>{
    const groupname = req.body.groupname;
    const description = req.body.description;
    if (groupname === "" ) {

        res.render("create-group", { message: "Please give your group a name" });
        return;
      }
});

module.exports = authRoutes;