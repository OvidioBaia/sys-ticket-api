const Sequelize = require("sequelize");
// const Route = require("./routes");

class Cities extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        name: Sequelize.STRING,
        state_id: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

// Cities.associate = (models) => {
//   Cities.belongsToMany(models.Route, {
//     through: "routes",
//     foreignKey: 'origem',
    
//   });
//   Cities.belongsToMany(models.Route, {
//     through: "routes",
//     foreignKey: 'destiny'
//   });
 

// }


module.exports = Cities;
