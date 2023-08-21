const passport = require("../passport");

const authenticate =  (req, res, next) => {
    passport.authenticate("local", function( err, user, info ) {
        console.log("In");
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json(info);
        }
        
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // Proceed to the next middleware or controller action
          return next();
        });
    })(req, res, next);
    // If the user is logged in, continue with the request to the restricted route
    // if (req.user) {
    //     return next();
    // };
    // // If the user isn't logged in, redirect them to the login page
    // return res.redirect("/login");
};

module.exports = authenticate;