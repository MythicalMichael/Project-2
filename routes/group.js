const express = require("express");
const router= express.Router();

const Group = require("../models/group");

router.get("/creategroup"),(req,res,next)=>{
res.render("create-group");
}

router.post("creategroup"),(req,res,next)=>{
    const groupname = req.body.groupname;
    const description = req.body.description;
    if (grouprname === "" ) {
        res.render("create-group", { message: "This Groupname already exists" });
        return;
      }
}