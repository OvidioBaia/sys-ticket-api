const Costumer = require("../models/costumer");

module.exports = {
  async create(data) {
    console.log(data);
   return Costumer.create(data);
  },

  async delete(id) {
    const deleted = await Costumer.destroy({
      where: { id: id },
    });

    return deleted;
  },

  async findOne(id) {
    const costumer= await Costumer.findOne({
      where: { id: id },
    });

    return costumer
  },

  async findOneByEmail(email) {
    const costumer= await Costumer.findOne({
      where: { email: email },
    });

    return costumer
  },

  async update(id, data) {
    console.log('id', id);
    console.log('data', data);
    const [updated] = await Costumer.update(data, {
      where: { id: id },
    });
    console.log('vbbb', updated);
    return updated;
  },

  async list() {
  
   const costumer = await Costumer.findAll();
    return costumer;
  },

  async findById(id) {
    const costumer= await Costumer.findAll({
      where: { id: id },
    });

    return costumer
  },
};
