
module.exports = app => {
  //import routes API
  require("./users")(app);
  require("./contacts")(app);
  require("./auth")(app);
  app.use('/api', require("express").Router());
};
