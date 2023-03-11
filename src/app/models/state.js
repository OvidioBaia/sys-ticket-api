const Sequelize = require("sequelize");

class State extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        name: Sequelize.STRING,
        uf: Sequelize.STRING
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
module.exports = State;
