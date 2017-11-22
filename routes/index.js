const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  Group.findOne({_id: groupId}, (err, group) => {
      if (err) return next(err);
      res.render('dashboard', group);
  });
});

module.exports = router;
