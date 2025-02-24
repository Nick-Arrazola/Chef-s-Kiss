const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true},
    data: { type: String },
    likes: { type: Number, default: 0 }, // Add the likes field with a default value of 0
}, { timestamps: { createdAt: 'created_at' } });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
