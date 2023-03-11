const Sequelize = require("sequelize");
const States = require("../models/state");
const Cities = require("../models/cities");
const Usuario = require("../models/user");
const Routes = require("../models/routes");
const Costumer = require("../models/costumer");
const Purchase = require("../models/purchase");
const databaseConfig = require("../../config/database");

const models = [Usuario, States, Cities,Routes,Costumer, Purchase];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
