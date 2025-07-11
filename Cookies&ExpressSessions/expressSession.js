const express = require("express");
const app = express();
const session = require("express-session");

let sessionOptions = {
  secret: "superSecretCode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.listen(3000, () => {
  console.log(`listening on port : 3000`);
  console.log("http://localhost:3000/");
});

app.get("/register", (req, res) => {
    // http://localhost:3000/register?name=Raiyan
  let { username = "anonymous" } = req.query;
  res.session.name = username; // creating variable 'name' in res.session
  res.send(name);
});

app.get("/hello", (req, res) => {
  res.send(`hello, ${res.session.name}`);
});
