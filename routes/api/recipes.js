const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipe/"
router.route("/")
    .get(recipesController.findAll)
    .post(recipesController.create);

// Matches with "/api/recipe/:id"
// TODO comment on how this works so that I better understand and remember
router.route("/:id")
    .get(recipesController.findById)
    //was ".put" before
    .post(recipesController.update)
    .put(recipesController.incrementlikes)
    .delete(recipesController.remove);

module.exports = router;