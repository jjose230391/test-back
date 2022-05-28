module.exports = (sequelize, Sequelize) => {
  return sequelize.define("contacts", {
    firstName: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      unique: true,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: false,
      field: 'last_name'
    },
    phone: {
      type: Sequelize.STRING(20),
      defaultValue: 0,
      unique: true,
      allowNull: false
    }
  });
};
