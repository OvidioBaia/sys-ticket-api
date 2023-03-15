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
    const purchase = await Route.findAll();
    // console.log("etrtt", routes);
    //const routes = await Route.findAll();
    return purchase;
    //return {purchase, count: purchase.length};
  },

  async listQuery(query) {
    console.log("eeee");
    console.log(query);
    let routes;
    if (query.origem != '' && query.destino !='') {
      console.log("caso 1");
      routes = await Route.findAll({where:{destiny: query.destino, origem: query.origem}});
    }
    if(query?.origem != '' && query?.destino == ''){
      console.log("caso 2");
      routes = await Route.findAll({where:{origem: query.origem }});
    }
    if(query?.origem == '' && query?.destino != '' && query?.hora == ''){
      console.log("caso 3");
      routes = await Route.findAll({where:{destiny: query.destino}});
    }
    if(query?.origem == '' && query?.destino == '' && query?.hora != ''){
      console.log("caso 4");
      routes = await Route.findAll({where:{arrive_time: query.hora }});
    }
    if(query?.origem != '' && query?.destino != '' && query?.hora == ''){
      console.log("caso 4.1");
      routes = await Route.findAll({where:{origem: query.origem, destiny: query.destino, }});
    }
    if(query?.origem != '' && query?.destino == '' && query?.hora != ''){
      console.log("caso 5");
      routes = await Route.findAll({where:{origem: query.origem }});
    }
    if(query?.origem == '' && query?.destino != '' && query?.hora != ''){
      console.log("caso 6");
      routes = await Route.findAll({where:{destiny: query.destino }});
    }
    console.log("bbbbb");

    return routes;
  },

  async findByRouteId(id) {
    console.log(id);
    const purchases = await Purchase.findAll({where: { router_id: id}});

    return purchases;
  },
};
