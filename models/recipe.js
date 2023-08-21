const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    data: { type: String },
    likes: { type: Number, default: 0 }, // Add the likes field with a default value of 0
}, { timestamps: { createdAt: 'created_at' } });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

// const mongoose = require("mongoose");

// const recipeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

// const Recipe = mongoose.model("Recipe", recipeSchema);

// module.exports = Recipe;
