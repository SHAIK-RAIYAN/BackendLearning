const express = require("express");
const path = require("path");
const app = express();

const methodOverride = require("method-override"); //to convert form post request to Patch
//we cant send patch request from html forms
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); //to process patch data

const { v4: uuid } = require("uuid"); //package for creating new id's for new created posts

let port = 3000;
app.listen(port, () => {
  console.log(`listening on port :${port}`);
  console.log("http://localhost:3000/posts");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuid(), //this gives new id every time it runs
    username: "raiyan",
    content:
      "What are the best thriller Novels to read ? i have read 'My house of horrors' it was Good and i am searching for something similar to it!",
  },
  {
    id: uuid(),
    username: "sarah_learns",
    content:
      "How can I improve my productivity while working from home? I keep getting distracted.",
  },
  {
    id: uuid(),
    username: "travelbug22",
    content:
      "What are some must-visit places in Japan for a first-time traveler?",
  },
  {
    id: uuid(),
    username: "healthnut",
    content:
      "What’s the best diet for sustainable weight loss without feeling deprived?",
  },
  {
    id: uuid(),
    username: "techie_jane",
    content:
      "Is it worth learning Python in 2025, or should I focus on another language?",
  },
  {
    id: uuid(),
    username: "bookworm88",
    content:
      "What are some must-read sci-fi books for someone new to the genre?",
  },
  {
    id: uuid(),
    username: "fitnessfreak",
    content:
      "What’s the best way to start running if I’ve never done it before?",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new_post.ejs");
});

app.post("/posts", (req, res) => {
  //if new post is sent from /posts/new
  // console.log(req.body);
  let { username, content } = req.body;
  let id = uuid();
  posts.push({ id, username, content });
  res.redirect("/posts"); //redirect to original /posts path (by default it sends get requests)
});

//for path /posts/id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id == post.id);
  if (post == undefined) {
    res.send(`<h1> No such id '${id}' exists!</h1>`);
  } else {
    res.render("showPost", { post });
  }
});

//we cant send patch request from html forms
app.patch("/posts/:id", (req, res) => {
  //patch to edit the post
  let { id } = req.params; //we take id
  let newContent = req.body.content; //content parameter in body
  let post = posts.find((post) => id == post.id); //we find post
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id == post.id);
  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => id !== post.id);
  res.redirect("/posts");
});

app.get("/", (req, res) => {
  // /*splat --> for all other paths
  res.send("you are in root path ");
});
