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

// ONE TO MANY (>100) RELATION
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

// Mongoose model for Order
const orderSchema = new Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

//so we define a middleware which deletes customer orders and customer
// findOneAndDelete ?? --> when we call findByIdAndDelete it calls findOneAndDelete to delete the data
// so, call these middlewares if findOneAndDelete is called
//pre runs before findOneAndDelete
//post runs after findOneAndDelete

// Correct usage: pre middleware (run before customer deletion)
customerSchema.pre("findOneAndDelete", async function (next) {
  const customer = await this.model.findOne(this.getFilter()); // getFilter -> gets _id
  if (customer && customer.orders.length > 0) {
    let res = await Order.deleteMany({
      _id: { $in: customer.orders },
    });
    console.log("Deleted related orders:", res);
  }
  next();
});

// Mongoose model for Customer
const Customer = mongoose.model("Customer", customerSchema);

// Function to add a new customer with existing orders
const addCustomer = async () => {
  let cust = new Customer({
    name: "Rahul",
    orders: [],
  });

  let order1 = await Order.findOne({ item: "Pizza" });
  let order2 = await Order.findOne({ item: "KFC" });
  let order3 = await Order.findOne({ item: "Burger" });
  let order4 = await Order.findOne({ item: "Alfredo Pasta" });
  let order5 = await Order.findOne({ item: "Burrata Pizza" });
  let order6 = await Order.findOne({ item: "Samosa" });

  cust.orders.push(order1);
  cust.orders.push(order2);
  cust.orders.push(order3);
  cust.orders.push(order4);
  cust.orders.push(order5);
  cust.orders.push(order6);

  let result = await cust.save();
  console.log(result);
};

// Function to insert orders
const addOrders = async () => {
  let res = await Order.insertMany([
    { item: "Pizza", price: 300 },
    { item: "Burger", price: 130 },
    { item: "KFC", price: 500 },
    // { item: "Samosa", price: 10 },
    // { item: "Burrata Pizza", price: 1200 },
    // { item: "Alfredo Pasta", price: 600 },
  ]);
  console.log(res);
};

// addOrders();
// addCustomer();

// Function to find and log orders
let find = async () => {
  //find Customers
  let res = await Customer.find({});
  // let res = await Customer.find({}).populate("orders");
  //here populate helps to replace the object_id of orders in customer to actual order (object) values

  //find orders
  // let res = await Order.find({});
  console.log(res);
};
find();

//Now if we delete a customer then his order doesn't delete from Orders
// So to delete all orders related to customer and also the customer then we do this, ::
//this deletes only customer not his orders from 'Orders'
const delCust = async () => {
  let data = await Customer.findByIdAndDelete("686ceea6841c3c70f3aa0a3f");
  //internally findByIdAndDelete this calls findOneAndDelete to delete the data
  console.log(data);
};

//go to line 34

// delCust();
