// tasks routes
const Group = require("../models/group");
const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post('/new', (req, res, next) => {
  const userId = req.body.userId;
  const groupId = req.body.groupId;
  const taskName = req.body.taskName;
  
  const newTask = Task({ userId, groupId, taskName, isDone: false })
  
  newTask.save((err, task) => {
      if (err) next(err);
      else {
        Group.findOneAndUpdate({_id: groupId}, {$push: {tasks: task._id}}, (err) => {
          if (err) next(err);
          res.redirect("/group/mygroup/" + groupId);
        });
      }
  });
});

module.exports = router;