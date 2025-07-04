const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js"); //requiring from models folder

const ExpressError = require("./ErrorHandling.js");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("Connection succcessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatWithMe");
}

let port = 3000;
app.listen(port, () => {
  console.log("listening on port :" + port);
  console.log("http://localhost:3000/");
});

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get(
  "/chats",
  asyncWrap(async (req, res) => {
    let chats = await Chat.find(); //process related to DB so it takes some time So async - await
    res.render("allchats.ejs", { chats });
  })
);

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

//show chat
app.get(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const chat = await Chat.findById(id); //if id is not fount then, chat -> undefined and undefined is sent to show chat
    if (!chat) {
      next(new ExpressError(404, "Chat not found"));
    }
    res.render("showchat.ejs", { chat });
  })
);

app.get(
  "/chats/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("editchat", { chat });
  })
);

app.put(
  "/chats/:id/edit",
  asyncWrap(async (req, res) => {
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
  })
);

app.delete(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  })
);

//error handling middleware
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    console.log(err.name);
    console.dir(err.message);
    console.log("This was a Validation error. Please follow rules");
  }
  next(err);    
});

//error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});
