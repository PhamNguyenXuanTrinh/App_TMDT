const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const BlogCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("BlogCategory", BlogCategorySchema);