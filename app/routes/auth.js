const { verifySignUp } = require("../middleware");


module.exports = app => {
  const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  //Headers Control
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Login a User
  router.post("/signin", auth.signin);

  // Register a new User
  router.post("/signup", auth.signup);


  app.use('/api/auth', router);
};
