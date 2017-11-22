const mongoose = require("mongoose");


const Schema   = mongoose.Schema;


const groupSchema = new Schema({
  groupname: String,
  description: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' }
},
 {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;