const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require("./routes/blog.js");
const authRoutes = require("./routes/auth.js");

const app = express();

mongoose.set("strictQuery", true);
//connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// app.get("*", (req, res) => {
//   res.json({ data: "Welcome to the server" });
// });
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
