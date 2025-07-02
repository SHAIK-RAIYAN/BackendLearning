const express = require("express");
const app = express();

/*Middlewares :: 

Request Processing: Middleware functions process HTTP requests between the client and server, executing in sequence.
Function Structure: Middleware takes req (request), res (response), and next (callback to pass control) as parameters.
Chained Execution: Middleware runs in the order defined, with next() passing control to the next middleware or route.
Versatile Use: Used for tasks like logging, authentication, error handling, or modifying request/response objects.
Route-Specific: Can be applied globally (app.use()) or to specific routes (e.g., app.get('/path', middleware)).

*/

// // First middleware
// app.use((req, res, next) => {
//   console.log("Hi, I am 1st middleware");
//   next();
// });

// // Second middleware
// app.use((req, res, next) => {
//   console.log("Hi, I am 2nd middleware");
//   next();
// });

// Custom Logger Middleware like - morgan (it is a middleware which also returns method, name, path, time)
app.use((req, res, next) => {
  req.time = Date.now();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

// Route-Specific Middleware for /random
// root path '/' means all paths.
app.use("/random", (req, res, next) => {
  console.log("I am only for random");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root.");
});

// Random route
app.get("/random", (req, res) => {
  res.send("this is a random page");
});

// Server listening
app.listen(8080, () => {
  console.log("listening to port 8080");
});
