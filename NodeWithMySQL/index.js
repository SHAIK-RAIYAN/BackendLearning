const { faker } = require("@faker-js/faker"); //to genertate large fake data
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "NodeBackend",
  password: "SK@01042005",
});

let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    // avatar: faker.image.avatar(),
    faker.internet.password(),
    // birthdate: faker.date.birthdate(),
    // registeredAt: faker.date.past(),
  ];
};

// let q1 = "SHOW TABLES"; //query
//inserting new data

// let q = "insert into user (id, username, email, password) values ?";
// let data = [];

// for (let i = 0; i < 100; i++) {
//   data.push(createRandomUser());
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// } catch (error) {
//   console.log(error);
// }
// connection.end();

// console.log(createRandomUser());

const express = require("express");
const path = require("path");
const app = express();

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public")); //telling express to serve style files from the public folder

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
  console.log("http://localhost:8080/");
});

//home page
app.get("/", (req, res) => {
  let q = "select count(*) from user";

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let count = result[0]["count(*)"];
      res.render("home", { count });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
});

//Users info page
app.get("/users", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, users) => {
      if (err) {
        throw err;
      }
      res.render("users", { users });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
});

// go to edit page
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id= '${id}';`;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      res.render("edit", { user });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
});

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

//edit user info
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id= '${id}';`;
  let { uname: newusername, pass: password } = req.body;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      console.log(user);
      console.log(user.password);
      if (password != user.password) {
        res.send("password Incorrect");
      } else {
        let q2 = `UPDATE user SET username = '${newusername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result2) => {
          if (err) throw err;
          res.redirect("/users");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
});
