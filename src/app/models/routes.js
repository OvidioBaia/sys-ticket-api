const Sequelize = require("sequelize");

class Route extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      { 
        origem: Sequelize.INTEGER,
        destiny: Sequelize.INTEGER, 
        departure_time: Sequelize.TIME,
        arrive_time: Sequelize.TIME,
        value: Sequelize.DECIMAL,
        km: Sequelize.DECIMAL,
        router_id: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
module.exports = Route;


// Route.associate = (models) => {
//   Route.hasMany(models.Cities, {
//     foreignKey: "id",
//     sourceKey: 'origem'
//   });
//   Route.hasMany(models.Cities, {
//     foreignKey: "id",
//     sourceKey: 'destiny'
//   });

// }
// Route.associate = (models) => {
 
// }
//   Route.belongsTo(models.Cities, {
//     foreignKey: "destiny",
//     as: "destiny",
//     targetKey: "id",
//   });
// }

