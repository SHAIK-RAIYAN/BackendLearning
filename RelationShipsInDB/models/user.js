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

// ONE TO FEW(MANY) RELATION
//one user has very few addresses
//defining user schema
const userSchema = new Schema({
  username: String,
  addresses: [
    {
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  try {
    let user1 = new User({
      username: "sherlockholmes",
      addresses: [
        {
          _id: false, //by default mongoose creates _id for this subobject so,not createing it
          location: "221B Baker Street",
          city: "London",
        },
      ],
    });

    user1.addresses.push({
      location: "P32 WallStreet",
      city: "London",
    });

    await user1.save();

    console.log("User added and updated successfully:", user1);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Execute the function (assuming MongoDB connection is established)
addUsers();
