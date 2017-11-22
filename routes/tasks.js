const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post('/new', (req, res, next) => {
  const userId = req.body.userId;
  const groupId = req.body.groupId;
  const taskName = req.body.taskName;
  
  const newTask = Task({ userId, groupId, taskName, isDone: false })
  
  newTask.save((task, err) => {
      if (err) next(err);
      else res.redirect("/");
  });
});

module.exports = router;