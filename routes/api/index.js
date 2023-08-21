const router = require("express").Router();
const userRoutes = require("./users");
const recipeRoutes = require("./recipes");
const imageRoutes = require("./images");

// sign up routes - http//:www.chefskiss.com/api/users
router.use("/users", userRoutes);

// recipe data routes - http//:www.chefskiss.com/api/recipes
router.use("/recipes", recipeRoutes);

// image data routes - http//:www.chefskiss.com/api/images
router.use("/images", imageRoutes);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Recipe = require("./recipes");

// // Add a new recipe
// router.post("/add", async (req, res) => {
//   const { name, image, description } = req.body;
//   try {
//     const recipe = new Recipe({ name, image, description });
//     await recipe.save();
//     res.status(201).json(recipe);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all recipes
// router.get("/", async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
