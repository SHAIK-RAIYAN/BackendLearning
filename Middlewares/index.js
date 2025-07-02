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

// Middleware for /api routes to check for token
app.use('/api', (req, res, next) => {
    let { token } = req.query; // Extract token from query parameters
    if (token === 'giveaccess') {
        next(); // Allow request to proceed if token is valid
    } else {
        res.send('DENIED!'); // Deny access if token is invalid
    }
});

// Route to handle GET requests to /api
app.get('/api', (req, res) => {
    res.send('data'); // Send response if middleware allows
});


// Route to trigger an error
app.get('/err', (req, res, next) => {
    // Intentionally cause an error by referencing undefined variable
    abcd = abcd; // This will throw a ReferenceError
    res.send('This will not be reached due to error');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.log('----- ERROR -----'); // Log error indicator
    console.error(err.stack); // Log the full error stack for debugging
    res.status(500).send('Something went wrong!'); // Send error response to client
    next(err); // Pass error to next middleware (ie, default express error handler middleware) 
});

// Server listening
app.listen(8080, () => {
  console.log("listening to port 8080");
});
