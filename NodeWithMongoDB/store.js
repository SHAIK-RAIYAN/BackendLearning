const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

main()
  .then(() => {
    console.log("Connection succesfull ");
  })
  .catch((err) => console.log(err));

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [10, "Price is too low bro..........👈👈 (minimum 10rs required)"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["fiction", "non fiction"],
  },
});
//the above vatidations and rules only checked/work when insertion of data
//when updating data these are not checked
//so, we use .runvalidators() to check validations while updating

const book = new mongoose.model("book", bookSchema);

const book1 = new book({
  title: "How not to die in nuclear war ?",
  author: "The people below",
  price: 11,
  category: "non fiction",
});

// book1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// book
//   .findByIdAndUpdate("685bf099f73374c64c4a9ea0", { price: 0 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// book
//   .findById("685bf099f73374c64c4a9ea0")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


book
  .findByIdAndUpdate(
    "685bf099f73374c64c4a9ea0",
    { price: 1 },
    { runValidators: true }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.errors.price.properties.message); //to print the error msg
  });
