const City = require("../models/cities");

module.exports = {
  async create(data) {
    return City.create(data);
  },

  async delete(id) {
    const deleted = await City.destroy({
      where: { id: id },
    });

    return deleted;
  },

  async findOne(id) {
    // console.log("ppp", id);
    const city = await City.findOne({
      where: { id: id },
    });
    return await city;
  },

  async findOneByName(nome) {
    const city = await City.findOne({
      where: { name: nome },
    });
    return city;
  },
 
  async update(id, data) {
    const response = await City.update(data, {
      where: { id: id },
    });

    return response;
  },

  async list(filtro) {
    let citys;
    if (filtro) {
      citys = await City.findAll({where: { endereco_id: filtro}});  
    }
    else {
      citys = await City.findAll();
    }
    
    return citys;
  },
};
