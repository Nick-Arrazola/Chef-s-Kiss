const router = require("express").Router();
const authenticate = require("../../config/middleware/authenticate");
// const passport = require("../../config/passport");
const usersController = require("../../controllers/usersController");

// Matches with "/api/signup" 
// POST: https//:www.chefskiss.com/api/users/signup
router.route("/signup/")
  .post(usersController.create);

// Matches with "/api/login"
// POST: https//:www.chefskiss.com/api/users/login
router.route("/login/")
  .post(authenticate, usersController.login);

// Matches with "/api/:id"
// GET: https//:www.chefskiss.com/api/users/:id
// PUT: https//:www.chefskiss.com/api/users/:id
// DEL: https//:www.chefskiss.com/api/users/:id
router.route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;