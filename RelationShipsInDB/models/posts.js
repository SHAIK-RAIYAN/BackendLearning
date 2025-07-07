const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationship");
}

// ONE TO SO MANY(>1000) RELATION
//so we use post containing user info
//istead of storing large number of posts inside user,
// we just add user info to each post
const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  let user1 = new User({
    username: "rahulkumar",
    email: "rahul@gmail.com",
  });
  
  let post1 = new Post({
    content: "Hello World!",
    likes: 7,
  });
  
  post1.user = user1;

  let u1 = await user1.save();
  let p1 = await post1.save();

  console.log(u1);
  console.log(p1);
  
};

// addData();

const getData = async () => {
  let result = await Post.findOne().populate("user");
  console.log(result);
};
getData();
