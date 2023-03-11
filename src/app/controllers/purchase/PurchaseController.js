
const service = require("../../services/purchase")
const cityService = require("../../services/city")
const responseErrorMessage = require("../../utils/responseErrorMessage");
const errorMessage = require("../../utils/responseErrorMessage");
const routeService = require("../../services/route")

function responseError(res) {
  return res.status(500).json({ res: errorMessage.res });
}

class PurchaseController {
  async store(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.body);
      const purchase = await service.create(req.body);
      return res.status(201).json({ res: "Compra criado com sucesso", purchase});
    } catch (error) {
      console.log(error);
      responseError(res);
    }
  }

  async teste(req, res, next){
    let b = await req.map(async(re)  =>( {
      ...re.dataValues,
      origemName: await cityService.findOne(re.origem),
      destinyName: cityService.findOne(re.destiny)
    })
    )
    return b
  }
  async index(req, res, next) {
    try {
      const purchase = await service.list();
      const rotas = await routeService.list();  

      let b = rotas.map(async(re)  =>( {
        ...re.dataValues,
        origemName:( await cityService.findOne(re.origem)).name,
        destinyName: (await cityService.findOne(re.destiny)).name,
        purchaseCount: (await service.findByRouteId(re.id)).length
      })
    )
    var f = await Promise.all(b)
    console.log(f);
      
      return await res.status(200).json(f);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res, error });
    }
  }

  async filter(req, res, next) {
    try {
      const purchase = await service.list();
      
      var rotas 
      if (req.query.destino != '' && req.query.origem != '') {
        //console.log("1 AA");
        var dis = await cityService.findOneByName(req.query.destino)
        var org = await cityService.findOneByName(req.query.origem)
        //console.log(req.query.data);
        var d = await service.findByData(req.query.data)
        //console.log("ee", d);
        rotas = dis && org ? await service.listQuery({origem: org.id , destino: dis.id}) : []
      }
      if (req.query.origem !== '' && req.query.destino == '') {
       // console.log("2 BB");

        var org = await cityService.findOneByName(req.query.origem)
        //console.log(dis);
        rotas = org ? await service.listQuery({origem: org.id, destino: ''}) : []
      }
      if (req.query.origem == '' && req.query.destino !== '') {
        //console.log("3 CC");

        var org = await cityService.findOneByName(req.query.destino)
        rotas = org ? await service.listQuery({destino: org.id, origem: ''}) : []
      }
      if (req.query.origem == '' && req.query.destino == '') {
        //console.log("4 DD");

        rotas = await service.list();  
      }
        

      let b = rotas.map(async(re)  =>( {
        ...re.dataValues,
        origemName:( await cityService.findOne(re.origem)).name,
        destinyName: (await cityService.findOne(re.destiny)).name,
        purchaseCount: (await service.findByRouteId(re.id)).length
      })
    )
    var f = await Promise.all(b)
    console.log(f);
      
      return await res.status(200).json(f);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res, error });
    }
  }

//   async delete(req, res, next) {
//     try {
//       const idUsuario_has_ponto = req.params.id;
    
//       const deleted = await services.delete(idUsuario_has_ponto);
//       if (deleted) {
//         return res.status(200).json({ res: "Usuario_has_ponto excluido com sucesso" });
//       }
//     } catch (error) {
//       responseError(res);
//     }
//   }

//   async update(req, res, next) {
//     try {
//       // duvida posso atulizar os dados do usuario e o ponto 
//       //ou so a tabela relação de ponto-taxi
//       const idUsuario_has_ponto = req.params.id;

//       const isUpdate = await services.update(idUsuario_has_ponto, req.body);
      
//       if (isUpdate[0] === 1) {
//         return res.status(200).json({ res: "Usuario_has_ponto atualizado com sucesso" });
//       }
//     } catch (error) {
//       console.log(error);
//       responseError(res);
//     }
//   }

  async findOne(req, res, next) {
    try {
      const id = req.params.id;
      const route = await service.findOne(id);
      res.status(200).json(route);
    } catch (error) {
      responseError(res);
    }
  }

//   async taxiForPoint(req, res, next) {
//     try {
//       console.log('eyy');
//       const id= req.params.id
//       console.log('eyy', id);
//       const ponto = await pontoService.findOne(id)
//       const usersPontos = await services.findByPontoId(ponto.id);
//       if(!usersPontos.length) {
//         return res.status(404).json({res: "Não existe ponto associado"});
//       }
//       let userAarray = []
//       for (const element of usersPontos) {
//         console.log('eyy', element);
//         userAarray.push(...await userService.findById(element.usuario_id))
//       }
//       console.log(userAarray);
//       return await res.status(200).json(userAarray);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ res: responseErrorMessage.res });
//     }
//   }
}

module.exports = new PurchaseController();
