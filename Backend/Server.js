const express = require("express");
const connectDb = require("./db");
const AuthRoute = require("./Routes/AuthRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// const __dirname = path.resolve();
console.log("__dirname: ", __dirname);
// console.log("dirname: ", dirname);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/Auth", AuthRoute);
const env = process.env.NODE_ENV || "production";
console.log("env: ", env);

app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
