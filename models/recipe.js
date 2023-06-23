const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    data: { type: String }
}, { timestamps: { createdAt: 'created_at' } });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;