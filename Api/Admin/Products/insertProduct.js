const connectDb = require("../../../Db/connectDb");

async function insertProduct(req, res) {
  try {
    // get database
    const db = await connectDb();

    // get collection
    const collection = db.collection("products");

    const {
      name,
      category_id,
      brand,
      price,
      description,
      images,
      size,
      color,
      material,
      gender,
      quantity,
      rating,
      is_featured,
      available_stock,
      care_instructions,
      availability_status,
      reviews,
    } = req.body;

    // write here query
    const insert = await collection.insertOne({
      name,
      category_id,
      brand,
      price,
      description,
      images,
      size,
      color,
      material,
      gender,
      quantity,
      rating,
      is_featured,
      available_stock,
      care_instructions,
      availability_status,
      reviews,
    });

    if (insert.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Data inserted successfully.",
        data: {},
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to insert data.",
        message:
          "Data insertion was unsuccessful. Please check the request and try again.",
      });
    }

    // Your MongoDB query here
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = insertProduct;
