const Sequelize = require("sequelize");

class Costumer extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        name: Sequelize.STRING,
        document: Sequelize.STRING, 
        phone: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Costumer;
