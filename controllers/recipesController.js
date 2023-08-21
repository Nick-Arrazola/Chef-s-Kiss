const db = require("../models");

// Defining methods for the RecipesController
module.exports = {
  create: function(req, res) {
    db.Recipe.findOne({ name: req.body.name })
      // if dbModel is undefined then create user account.  
      // if dbmodel exists and the user provided password is invalid, then send unauthorized status 401 with response.data "Inuse", as the username/account is unavailible.
      // if dbmodel exists and the user provided password is valid, then send the user model (sans password) to be automatically logged in (user match - lazy login reroute for the unaware)
      .then(dbModel => {
        switch(true) {
          case !dbModel:
            db.Recipe.create(req.body)
              .then(dbModel => {
                console.log("Account created for user: " + dbModel._doc.username)
                delete dbModel._doc["password"];  // withhold password from front end
                res.json(dbModel._doc)
              })
              .catch(err => res.status(422).json(err));
            break;
          case !dbModel.validPassword(req.body.password):
            throw 'Inuse';
          default:
            delete dbModel._doc["password"];  // withhold password from front end
            res.json(dbModel._doc)
        }
      })
      .catch(err => res.status(401).send(err));  // unauthorized status code 401 - invalid Credentials: username already in use
  },
  login: function(req, res) {
    db.Recipe.findOne({ username: req.body.username })
      .then(dbModel => {
        delete dbModel._doc["password"];  // withhold password from front end
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const payload = req.body;
    const updates = { 
      ...(payload.name && { name: payload.name }),
      data: payload.data
    };
    db.Recipe.findOneAndUpdate({ name: req.params.id }, updates, {
      new: true
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Recipe.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.Recipe.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Recipe.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  incrementlikes: function(req, res) {
    db.Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({ error: 'Recipe not found' });
        }

        recipe.likes += 1;

        return recipe.save();
      })
      .then(updatedRecipe => {
        res.status(200).json({ likes: updatedRecipe.likes });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
      });
  },
  getLikeCount: function(req, res) {
    db.Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({ error: 'Recipe not found' });
        }
        
        res.status(200).json({ likes: recipe.likes });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
      });
  }  
};