const services = require("../../services/user");
const responseErrorMessage = require("../../utils/responseErrorMessage");
const errorMessage = require("../../utils/responseErrorMessage");

function responseError(res) {
  return res.status(500).json({ res: errorMessage.res });
}

class UsuarioController {
  async store(req, res, next) {
    try { 
      const { name, password, email, phone, type, forget } = req.body;
      const user =  {
        name,
        email,
        password,
        phone,
        type,
        forget
      }
      const u = await services.create(user);

      return res.status(201).json({ res: "Usuario criado com sucesso", u });
    } catch (error) {
      responseError(res);
    }
  }

  async index(req, res, next) {
    try {
      const users = await services.list();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res });
    }
  }

  async delete(req, res, next) {
    try {
      const idUsuario = req.params.id;

      const deleted = await services.delete(idUsuario);
      if (deleted) {
        return res.status(200).json({ res: "Usuario excluido com sucesso" });
      }
    } catch (error) {
      responseError(res);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const { name, password, email, phone, type, forget } = req.body;

      const user =  {
        name,
        email,
        password,
        phone,
        type,
        forget
      }
      // await services.update(id,user);
      const updated = await services.update(id, user);
      console.log('aaaabbbb', updated);
      if (updated) {
        return res.status(200).json({ res: "Usuario atualizado com sucesso" });
      }
    } catch (error) {
      responseError(res);
    }
  }

  async findOne(req, res, next) {
    try {
      const idUsuario = req.params.id;
      const user = await services.findOne(idUsuario);
      res.status(200).json(user);
    } catch (error) {
      responseError(res);
    }
  }
}

module.exports = new UsuarioController();
