const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let sessionOptions = {
  secret: "superSecretCode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.listen(3000, () => {
  console.log(`listening on port : 3000`);
  console.log("http://localhost:3000/");
});

app.get("/register", (req, res) => {
  // http://localhost:3000/register?name=Raiyan
  let { name = "anonymous" } = req.query;
  req.session.name = name; // creating variable 'name' in req.session
  req.flash("success", "user registered"); //key value par
  req.flash("error", "some error occured!"); //key value par
  res.send(name);
});

app.get("/hello", (req, res) => {
  res.locals.successMsg = req.flash("success"); //property to set variables accessible in templates rendered with res.render.
  res.render("page", { name: req.session.name });
  //flash msg only shown once and after refresh no msg is shown
  //sending msg using 'key'
});
