const express = require("express");
const app = express();

const myError = require("./customError"); //requiring myerror

// Start server
app.listen(8080, () => {
  console.log("Listening on port 8080");
});

// // Route to trigger an error
// app.get("/err", (req, res, next) => {
//   abcd = abcd; // Intentionally throws error     (undefined variable)
//   res.send("This will not be reached due to error");
// });

// // Error-handling middleware
// app.use((err, req, res, next) => {
//   console.log("----- ERROR -----"); // Log error indicator
//   console.error(err.stack); // Log full error stack for debugging
//   //next(); //here we get  --> Cannot GET /err even though we are getting /err above
//   //this happens because next() calls non error handling middleware but there is none
//   // so we also send our error to next() so that it takes the error to default error handler
//   next(err); // here we get ReferenceError: abcd is not defined
// });

// Token-checking middleware
const checkToken = (req, res, next) => {
  let { token } = req.query; // Extract token from query parameters
  if (token === "giveaccess") {
    next(); // Proceed if token is valid
  } else {
    throw new myError(
      401,
      "ACCESS DENIED!(this err shown by custom made myError) !"
    ); // Throw error if token is invalid
  }
};

// API route with token middleware
app.get("/api", checkToken, (req, res) => {
  res.send("data"); // Send response if middleware allows
});
// http://localhost:8080/api?token=giveaccess

app.use((err, req, res, next) => {
  // res.send(err);
  //myError is thrown only if token ! giveaccess
  //so if any other error is sent to this middleware then, we set default status and message values
  let { status, message } = err;
  res.status(status).send(message);
});
//
//
// Throwing an error (e.g., throw new Error('myError')) from an async function in Express middleware doesn't automatically pass it to the error-handling middleware, as async errors are caught by the Promise rejection mechanism.

// Solution: Use next(new Error('myError')) to explicitly pass the error to the next error-handling middleware.

app.get("/async", async (req, res, next) => {
  try {
      throw new myError(500, "async fnc error like chat not fount from database");
      //this error is not handled, cause express doesnt call next() ie, default error handler in async fnc
  } catch (err) {
    next(new myError(500, "asnc fun error")); // so we pass our error in next(err) manually to be handled
  }
});
