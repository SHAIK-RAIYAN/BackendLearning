const express = require("express");
const app = express();

//cookie parser to see cookie data
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));

app.listen(8080, () => {
  console.log("Connection successful");
});

app.get("/", (req, res) => {
  console.dir(req.cookies);
  res.send("root path");
});

app.get("/getcookies", (req, res) => {
  res.cookie("Greet", "Ola");
  res.cookie("country", "Spain");
  res.send("cookies sent!!");
});

app.get("/signedcookies", (req, res) => {
  res.cookie("my-name", "raiyan", { signed: true });
  res.send("signed cookies sent!!");
});

app.get("/verify", (req, res) => {
  //if any changes happen in cookies in browser then we get null or false as output for signed cookies

  console.dir(req.signedCookies);
});
