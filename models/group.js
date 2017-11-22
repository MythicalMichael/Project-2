const mongoose = require("mongoose");


const Schema   = mongoose.Schema;


const groupSchema = new Schema({
  groupname: String,
  description: String,
  adminId: { //Id of the administrator of this group
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: 'Task'
  },
  userIds: { //Array of ids corresponding to the users of this group
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;