const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    timestamps: false,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contacts = require("./contacts.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);

// Definition of relations between models
// //db.role = require("../models/role.model.js")(sequelize, Sequelize);
// // db.role.belongsToMany(db.user, {
// //   through: "user_roles",
// //   foreignKey: "roleId",
// //   otherKey: "userId"
// // });
// // db.user.belongsToMany(db.role, {
// //   through: "user_roles",
// //   foreignKey: "userId",
// //   otherKey: "roleId"
// // });
// // db.ROLES = ["user", "admin", "guest"];
module.exports = db;
