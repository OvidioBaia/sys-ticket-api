const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        phone: Sequelize.STRING,
        type: Sequelize.STRING,
        forget: Sequelize.STRING
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
module.exports = User;

// Usuario.associate = (models) => {
//   Usuario.belongsTo(models.Endereco, {
//     foreignKey: "endereco_id",
//     as: "endereco",
//     targetKey: "id",
//   });
// }