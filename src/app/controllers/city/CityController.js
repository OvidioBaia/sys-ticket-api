const services = require("../../services/city");
const responseErrorMessage = require("../../utils/responseErrorMessage");
const errorMessage = require("../../utils/responseErrorMessage");

function responseError(res) {
  return res.status(500).json({ res: errorMessage.res });
}

class CityController {
  async store(req, res, next) {
    try {
      const response = await services.create(req.body);
      return res.status(201).json({ res: "Cidade criado com sucesso", city: response });
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
      const idPonto = req.params.id;

      const deleted = await services.delete(idPonto);
      if (deleted) {
        return res.status(200).json({ res: "Ponto excluido com sucesso" });
      }
    } catch (error) {
      responseError(res);
    }
  }

  async update(req, res, next) {
    try {
      const idPonto = req.params.id;

      const isUpdate = await services.update(idPonto, req.body);

      if (isUpdate[0] === 1) {
        return res.status(200).json({ res: "Ponto atualizado com sucesso" });
      }
    } catch (error) {
      console.log(error);
      responseError(res);
    }
  }

  async findOne(req, res, next) {
    try {
      const idPonto = req.params.id;
      const user = await services.findOne(idPonto);
      res.status(200).json({ res: user });
    } catch (error) {
      responseError(res);
    }
  }
}

module.exports = new CityController();
