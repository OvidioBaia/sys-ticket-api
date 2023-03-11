const services = require("../../services/costumer");
const responseErrorMessage = require("../../utils/responseErrorMessage");
const errorMessage = require("../../utils/responseErrorMessage");

function responseError(res) {
  return res.status(500).json({ res: errorMessage.res });
}

class CostumerController {
  async store(req, res, next) {
    try { 
      console.log(req.body);
      const { name, email, phone, document } = req.body;
      const user =  {
        name,
        email,
        document,
        phone
      }
      const costumer = await services.create(user);

      return res.status(201).json({ res: "Cliente criado com sucesso", costumer });
    } catch (error) {
      responseError(res);
    }
  }

  async index(req, res, next) {
    try {
      const costumers = await services.list();
      return res.json(costumers);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res });
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;

      const deleted = await services.delete(id);
      if (deleted) {
        return res.status(200).json({ res: "Cliente excluido com sucesso" });
      }
    } catch (error) {
      responseError(res);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      // await services.update(id,user);
      const updated = await services.update(id, req.body);
      console.log('aaaabbbb', updated);
      if (updated) {
        return res.status(200).json({ res: "Cliente atualizado com sucesso" });
      }
    } catch (error) {
      responseError(res);
    }
  }

  async findOne(req, res, next) {
    try {
      const id = req.params.id;
      const costumer = await services.findOne(id);
      res.status(200).json(costumer);
    } catch (error) {
      responseError(res);
    }
  }
}

module.exports = new CostumerController();
