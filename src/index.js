const express = require("express");
const path = require("path");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();
const port = 9999;

const route = require("./routes");
const db = require("./config/db");
//connect db

db.connect();
// Su dung cors
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const hbs = handlebars.create({
  extname: ".hbs",
  helpers: {
    sum: (a, b) => a + b,
  },
});

app.use(morgan("combined"));

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));

app.use(methodOverride("_method"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
