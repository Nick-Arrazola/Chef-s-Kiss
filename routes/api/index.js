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