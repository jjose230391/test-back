module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    username: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      unique: true,
      allowNull: false,
      field: 'username'
    },
    password: {
      type: Sequelize.STRING(255),
      unique: false,
      allowNull: false,
      field: 'password'
    }
  });
};
