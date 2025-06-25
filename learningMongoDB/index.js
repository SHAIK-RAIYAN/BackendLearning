const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main()
  .then(() => {
    console.log("Connection succesfull ");
  })
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema); //creating collections

// const user2 = new User({
//   name: "bob",
//   email: "bobby@gmail.com",
//   age: 27,
// });

// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertMany([
//   {
//     name: "Tony",
//     email: "tony@gmail.com",
//     age: 50,
//   },
//   {
//     name: "Peter",
//     email: "peter@gmail.com",
//     age: 30,
//   },
//   {
//     name: "Bruce",
//     email: "bruce@gmail.com",
//     age: 47,
//   },
// ]).then((res) => {
//   console.log(res);
// });

// User.find({ age: {$gt :47} }).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// User.findById("685a8b4f265a8736e989c528")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.updateMany({ name: "Adam" }, { age: 49 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findOneAndUpdate({ name: "bob" }, { age: 60 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findByIdAndUpdate("685a94c69c0592994c573e2c", { age: 100 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.deleteOne({ name: "Bruce" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

User.findByIdAndDelete("685a94e0a90d051707973fff")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
