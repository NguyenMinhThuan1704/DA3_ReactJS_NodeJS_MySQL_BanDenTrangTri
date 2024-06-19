const express = require("express");

const routes = require("./routes");
const { connect } = require("./config/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

connect();

// app.use(morgan('dev'));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
routes(app);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Backend CodeLearn listening on http://localhost:${port}`);
});
