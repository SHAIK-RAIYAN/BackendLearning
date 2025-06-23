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
