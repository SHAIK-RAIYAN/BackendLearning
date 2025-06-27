const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
      type: String,
      maxlength:100,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
