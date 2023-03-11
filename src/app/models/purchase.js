const Sequelize = require("sequelize");

class Purchase extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        router_id: Sequelize.INTEGER,
        costumer_id: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );

    return this;
  }
}


module.exports = Purchase;
