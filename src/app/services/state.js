const State = require("../models/state");

module.exports = {
  async create(data) {
    // console.log("aaaa", data);
   return State.create(data);
  },

  async delete(id) {
    const deleted = await State.destroy({
      where: { id: id },
    });

    return deleted;
  },

  async findOne(id) {
    const endereco = await State.findOne({
      where: { id: id },
    });

    return endereco;
  },
  

//   async findOneByEmail(email) {
//     const Endereco = await Endereco.findOne({
//       where: { email: email },
//     });

//     return Endereco;
//   },

  async update(id, data) {
    console.log("aaquiiii", id);
    const response = await State.update(data, {
      where: { id: id },
    });

    return response;
  },

  async list() {
    const Enderecos = await State.findAll();

    return Enderecos;
  },
};
