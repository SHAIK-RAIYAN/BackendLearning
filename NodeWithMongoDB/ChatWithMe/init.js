const mongoose = require("mongoose");

const Chat = require("./models/chat.js"); //requiring from models folder

main()
  .then((res) => {
    console.log("Connection succcessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatWithMe");
}

// data

let allChats = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, how are you?",
    created_on: new Date("2025-06-25T10:00:00Z"),
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Hi Alice, I’m good! You?",
    created_on: new Date("2025-06-25T10:02:00Z"),
  },
  {
    from: "Charlie",
    to: "Alice",
    msg: "Meeting at 5 PM today, right?",
    created_on: new Date("2025-06-25T11:30:00Z"),
  },
  {
    from: "Alice",
    to: "Charlie",
    msg: "Yes, see you at 5!",
    created_on: new Date("2025-06-25T11:31:00Z"),
  },
  {
    from: "Bob",
    to: "Dave",
    msg: "Did you check the latest report?",
    created_on: new Date("2025-06-25T12:00:00Z"),
  },
  {
    from: "Dave",
    to: "Bob",
    msg: "Yes, all looks good.",
    created_on: new Date("2025-06-25T12:05:00Z"),
  },
  {
    from: "Alice",
    to: "Bob",
    msg: "Are we still on for the weekend trip?",
    created_on: new Date("2025-06-25T14:00:00Z"),
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Absolutely, can’t wait!",
    created_on: new Date("2025-06-25T14:05:00Z"),
  },
];

// Chat.insertMany(allChats)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
