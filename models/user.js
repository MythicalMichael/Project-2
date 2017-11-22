// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//const Task  = require('./task');

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'member'],
    group:{ 
      type: Schema.Types.ObjectId, 
      ref: 'Group' }
  },
 // tasks: [Task.schema]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;