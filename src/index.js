// const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
// const handlebars = require("express-handlebars");
// const methodOverride = require("method-override");
// const app = express();
// const port = 9999;


// const route = require("./routes");
// const db = require("./config/db");

// //connect db

// db.connect();
// // Su dung cors

// app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.json());

// const hbs = handlebars.create({
//   extname: ".hbs",
//   helpers: {
//     sum: (a, b) => a + b,
//     roleName: function (role) {
//       if (role === "0") {
//         return "Customer";
//       } else if (role === "1") {
//         return "Admin";
//       } else {
//         return "unknown";
//       }
//     },
//   },
// });

// app.use(morgan("combined"));

// app.engine("hbs", hbs.engine);

// app.set("view engine", "hbs");

// app.set("views", path.join(__dirname, "resources", "views"));

// app.use(methodOverride("_method"));

// route(app);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

// index.js
import http from 'http';
 
// Create a server object
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // Write some text to the response
    res.end('Welcome to my simple Node.js app!');
});
 
// Define the port to listen on
const port = 3000;
 
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
