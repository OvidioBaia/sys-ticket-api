const User = require("../models/user");

module.exports = {
  async create(data) {
   return User.create(data);
  },

  async delete(id) {
    const deleted = await User.destroy({
      where: { id: id },
    });

    return deleted;
  },

  async findOne(id) {
    const user = await User.findOne({
      where: { id: id },
    });

    return user;
  },

  async findOneByEmail(email) {
    const user = await User.findOne({
      where: { email: email },
    });

    return user;
  },

  async update(id, data) {
    console.log('id', id);
    console.log('data', data);
    const [updated] = await User.update(data, {
      where: { id: id },
    });
    console.log('vbbb', updated);
    return updated;
  },

  async list() {
  
   const users = await User.findAll();
    return users;
  },

  async findById(id) {
    const user = await User.findAll({
      where: { id: id },
    });

    return user;
  },
};
