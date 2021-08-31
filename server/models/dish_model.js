const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("Dish", DishSchema);
