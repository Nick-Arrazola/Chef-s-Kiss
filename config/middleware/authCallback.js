//This is middleware for failuire of passport strategy
const authCallback = function ( err, user, info ) {
    // const { err, user, info } = req.authInfo;
    
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
  };

  module.exports = authCallback;