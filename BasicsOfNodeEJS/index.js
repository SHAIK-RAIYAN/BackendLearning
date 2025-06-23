//Templates
/*EJS (Embedded JavaScript templates)
EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. */

const express = require("express");
const path = require("path"); //path package to set views path
//here no need to require('ejs') cause, express automatically acquires it.
const app = express();

let port = 3000;
app.listen(port, () => {
  console.log(`listening on port : ${port}`);
  console.log("http://localhost:3000/");
});

app.set("view engine", "ejs"); // view engine --> Templates
// View engines is essential for generating dynamic HTML content
// we render(send) files using ejs
//by default, view engine expect that all our templates are stored in views folder

/*if we run index.js file from another folder
like  -> nodemon /"path_to_index file"/  
then express searches for 'views' folder from which folder we have run it! 
So it cannot find the views folder cause we created that folder in our work folder.
*/

app.use(express.static("public")); // saying it that styles.css is in public folder

app.set("views", path.join(__dirname, "/views")); // usiing path package
// this tells the express to search for views in the __dirname of code (i.e, EJS folder (current folder))

app.get("/", (req, res) => {
  // we use res.render() to render a file
  res.render("home.ejs"); // express searches for views folder for home.ejs
});

app.get("/rolldice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 7);
  res.render("rolldice.ejs", { diceVal }); //here end parameter is object it says  "diceVal(key) : diceVal(value)"
});
