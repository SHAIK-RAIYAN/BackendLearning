const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js"); //requiring from models folder

let port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("Connection succcessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatWithMe");
}

app.listen(port, () => {
  console.log("listening on port :" + port);
  console.log("http://localhost:3000/");
});

app.get("/", (req, res) => {
  res.send(
    "Go to view chats page : <a href='http://localhost:3000/chats'>http://localhost:3000/chats</a>"
  );
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("allchats.ejs", { chats });
});

app.get("/chats/newchat", (req, res) => {
  res.render("newchat.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_on: new Date(),
  });
  newChat
    .save()
    .then(() => {
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
    });
  //process related to DB but it has "then()" so then will wait to save and then continues the execution
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("editchat", { chat });
});

app.put("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let { newmsg } = req.body;
  await Chat.findByIdAndUpdate(
    id,
    {
      msg: newmsg,
      created_on: new Date(),
    },
    { runValidators: true }
  );

  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
