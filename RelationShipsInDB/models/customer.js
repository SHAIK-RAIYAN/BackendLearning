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

// ONE TO MANY RELATION
const customerSchema = new Schema({
    name: String,
    //storing child(order) reference in parent(customer)
    orders: [
        {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);
const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Rahul Kumar",
    orders: [],
  });

  let order1 = await Order.findOne({ item: "Samosa" });
  let order2 = await Order.findOne({ item: "Alfredo Pasta" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let result = await cust1.save();
  console.log(result);
};

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

const addOrders = async () => {
  let res = await Order.insertMany([
    { item: "Samosa", price: 10 },
    { item: "Burrata Pizza", price: 1200 },
    { item: "Alfredo Pasta", price: 600 },
  ]);
  console.log(res);
};

// addOrders();

// addCustomer();

let find = async () => {
  let res = await Customer.find({}).populate("orders");
  //here populate helps to replace the object_id of orders in customer to actual order (object) values
  console.log(res);
};
find();
