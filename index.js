const cors = require("cors");
const express = require("express");
const connectDb = require("./Db/connectDb");
const insertCategories = require("./Api/Admin/Category/insertCategories");
const insertCategory = require("./Api/Admin/Category/insertCategory");
const insertProduct = require("./Api/Admin/Products/insertProduct");
const insertProducts = require("./Api/Admin/Products/insertProducts");
const fetchAllCategories = require("./Api/User/Category/fetchAllCategories");
const fetchAllProducts = require("./Api/User/Products/fetchAllProducts");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDb();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Started",
    apis: {
      products: "",
      categories: "",
    },
  });
});

app.get("/products", fetchAllProducts);
app.get("/categories", fetchAllCategories);

// admin
app.post("/insertProducts", insertProducts);
app.post("/insertProduct", insertProduct);
app.post("/insertCategories", insertCategories);
app.post("/insertCategory", insertCategory);

app.listen(PORT, () => {
  console.log("Server Started At : ", PORT);
});
