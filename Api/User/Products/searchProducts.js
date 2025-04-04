const connectDb = require("../../../Db/connectDb");

async function SearchProducts(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("products");

    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Convert to string just in case someone passes a number
    const searchValue = String(query).trim();

    // Case-insensitive regex filter across relevant fields
    const filter = {
      $or: [
        { name: { $regex: searchValue, $options: "i" } },
        { material: { $regex: searchValue, $options: "i" } },
        { tags: { $regex: searchValue, $options: "i" } },
        { color: { $regex: searchValue, $options: "i" } },
      ],
    };

    const data = await collection.find(filter).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: "No Data Found" });
    }

    return res.status(200).json({ message: "Data Fetched", packages: data });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { SearchProducts };
