const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema= new Schema({
  text: {
    type: String,
    default: ""
  },
  imageUrl:{
    type: String,
    default: ""
  },
  video: {
    type: String,
    default: ""
  },
  seen:{
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
})


const conversationSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    reciever: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },

    messages: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);


const MessageModel = mongoose.model("Message", messageSchema);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = {
  MessageModel,
  ConversationModel
};
