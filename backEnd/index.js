const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AuthRoutes = require("./routes/auth.js");
// const router = require("./routes/auth.js");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", AuthRoutes);
app.get("/", (req, res) => {
  res.send(`helloworld`);
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
