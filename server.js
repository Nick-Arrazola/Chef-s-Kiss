const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const routes = require("./routes");
const server = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/chefskiss";

//setup session middleware
const sessionMiddleware = session({
    name: "chefskiss",
    secret: "sievert",
    resave: true,
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 3 //cookie will be active for 3 hours
    }
});

//setup with express server with configurations
server.use(cors());
server.options("*", cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Integrate express session and passport to intialize the authentication middleware
server.use(sessionMiddleware);
server.use(passport.initialize());
server.use(passport.session());

//serve static assets (react front end) when in production
if (process.env.NODE_ENV === "production") {
    server.use(express.static("client/build"));
};

//add routes both api and view
server.use(routes);

//create connection to mongodb
mongoose.connect(mongoUri);

//start the api server
server.listen(port, () => {
    console.log(`🌎 ==> API Server now listening on PORT ${port}!`);
});