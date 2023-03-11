const Route = require("../models/routes");
const City = require("../models/cities");
const cityService = require("./city");
const Cities = require("../models/cities");
const Purchase = require("../models/purchase")

module.exports = {
  async create(data) {
    return Purchase.create(data);
  },

  async delete(id) {
    const deleted = await Purchase.destroy({
      where: { id: id },
    });

    return deleted;
  },

  async findOne(id) {
    const purchase = await Purchase.findOne({
      where: { id: id }, 
    });

    return purchase;
  },

  async update(id, data) {
    const response = await Purchase.update(data, {
      where: { id: id },
    });

    return response;
  },

  async list() {
    console.log("aaaaa");
    const purchase = await Purchase.findAll();
    // console.log("etrtt", routes);
    //const routes = await Route.findAll();

    return {purchase, count: purchase.length};
  },

  async findByRouteId(id) {
    console.log(id);
    const purchases = await Purchase.findAll({where: { router_id: id}});

    return purchases;
  },
};
