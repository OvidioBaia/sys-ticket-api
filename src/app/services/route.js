const Route = require("../models/routes");
const City = require("../models/cities");
const cityService = require("../services/city");
const Cities = require("../models/cities");
const { Op } = require("sequelize");

module.exports = {
  async create(data) {
    return Route.create(data);
  },

  async delete(id) {
    console.log("qqq", id);
    const deleted = Route.destroy({
      where: { id: id },
    });
    return deleted;
  },

  async findOne(id) {
    const route = await Route.findOne({
      where: { id: id }, 
    });

    console.log(route);
    return route;
  },

  async update(id, data) {
    const response = await Route.update(data, {
      where: { id: id },
    });

    return response;
  },

  async list(query) {
    const routes = await Route.findAll();
    // console.log("etrtt", routes);
    //const routes = await Route.findAll();

    return routes;
  },
  async listQuery(query) {
    console.log('eee',query);
    let routes;
    if (query?.origem != '' && query?.destino !='') {
      console.log("caso 1");
      routes = await Route.findAll({where:{destiny: query.destino, origem: query.origem }});
    }
    if(query?.origem !== '' && query?.destino == ''){
      console.log("caso 2");
      routes = await Route.findAll({where:{origem: query.origem }});
    }
    if(query?.origem == '' && query?.destino != ''){
      console.log("caso 3");
      routes = await Route.findAll({where:{destiny: query.destino}});
    }
    console.log("bbbbb");
    // routes = await Route.findAll();
    // console.log("etrtt", routes);
    //const routes = await Route.findAll();

    return routes;
  },
  async findByData(data) {
    const route = await Route.findAll({
      where: { departure_time: data, arrive_tim: data },
    });

    return route;
  },

  async findByCity(id) {
    const route = await Route.findAll({
      where: { origem: id }
    });

    return route;
  },
 
};
