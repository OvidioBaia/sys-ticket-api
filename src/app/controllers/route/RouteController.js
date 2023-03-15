
const service = require("../../services/route")
const cityService = require("../../services/city")
const responseErrorMessage = require("../../utils/responseErrorMessage");
const errorMessage = require("../../utils/responseErrorMessage");
const Route = require("../../models/routes");

function responseError(res) {
  return res.status(500).json({ res: errorMessage.res });
}

class RouteController {
  async store(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.body);
      const a = await service.create(req.body);
      return res.status(201).json({ res: "Rota criado com sucesso", route: a });
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
  async filter(req, res, next) {
    
    console.log(req.query.origem.toUpperCase());
    console.log(req.query);
    ///const { hora= ''} = req.query;
    console.log(req.query.hora == "null"? "s" : "null");

    try {
      ///console.log('aaa', req.query);
      var rotas;
      if (req.query.destino != '' && req.query.origem != '' && req.query.hora != 'null') {
        console.log("caso 0")
        var dis = await cityService.findOneByName(req.query.destino.toUpperCase())
        var org = await cityService.findOneByName(req.query.origem.toUpperCase())

        rotas = dis && org ? await service.listQuery({origem: org.id , destino: dis.id, hora: req.query.hora}) : []
      }
      if (req.query.origem != '' && req.query.destino == '' && req.query.hora == 'null') {
        console.log("caso 1")
        var org = await cityService.findOneByName(req.query.origem.toUpperCase())
        rotas = org ? await service.listQuery({origem: org.id, destino: '', hora: ''}) : []
      }
      if (req.query.origem == '' && req.query.destino !== '' && req.query.hora == 'null') {
        console.log("caso 2")

        var org = await cityService.findOneByName(req.query.destino.toUpperCase())
        rotas = org ? await service.listQuery({destino: org.id, origem: '', hora: ''}) : []
      }
      if (req.query.origem == '' && req.query.destino == '' && req.query.hora !='null')  {
        console.log("caso 3")
        //var org = await cityService.findOneByName(req.query.destino.toUpperCase())
        rotas = await service.listQuery({destino: '', origem: '',hora: req.query.hora }) ?? []
      }
      if (req.query.origem != '' && req.query.destino != '' && req.query.hora =='null')  {
        console.log("caso 3.0.2")
        var dist = await cityService.findOneByName(req.query.destino.toUpperCase())
        var org = await cityService.findOneByName(req.query.origem.toUpperCase())

        rotas = dist ?  await service.listQuery({destino: dist.id, origem:org.id,hora: '' }) : []
      }
      if (req.query.origem != '' && req.query.destino == '' && req.query.hora !='null')  {
        console.log("caso 3.1")
        var org = await cityService.findOneByName(req.query.origem.toUpperCase())
        rotas = await service.listQuery({destino: '', origem: org.id,hora: req.query.hora }) ?? []
      }
      if (req.query.origem == '' && req.query.destino != '' && req.query.hora !='null')  {
        console.log("caso 3.2")
        var dist = await cityService.findOneByName(req.query.destino.toUpperCase())
        rotas = dist ?  await service.listQuery({destino: dist.id, origem:'',hora: req.query.hora }) : []
      }
      if (req.query.origem == '' && req.query.destino == '' && req.query.hora == 'null') {
        console.log("caso 4")
        rotas = await service.list();  
      }
    
      let b = rotas.map(async(re)  =>( {
        ...re.dataValues,
        origemName:( await cityService.findOne(re.origem)).name,
        destinyName: (await cityService.findOne(re.destiny)).name
      })
    )
  
      var f = await Promise.all(b)
      //console.log(f ? f : []);
      return await res.status(200).json(f);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res, error });
    }
  }
  async routeByCity(req, res, next) {
    try {
      console.log('aaa', req.params.id);
      var rotas;
      var x = await service.findByCity(req.params.id)
      console.log("xxx",x);
      console.log("xxx",req.query.origem);

      // if (req.query.destino != '' && req.query.origem != '' && req.query.data != '') {
      //   console.log("1 AA");
      //   var dis = await cityService.findOneByName(req.query.destino)
      //   var org = await cityService.findOneByName(req.query.origem)
      //   console.log(req.query.data);
      //   var d = await service.findByData(req.query.data)
      //   console.log("ee", d);
      //   rotas = dis && org ? await service.listQuery({origem: org.id , destino: dis.id}) : []
      // }
      // if (req.query.origem !== '' && req.query.destino == '') {
      //   console.log("2 BB");

      //   var org = await cityService.findOneByName(req.query.origem)
      //   //console.log(dis);
      //   rotas = org ? await service.listQuery({origem: org.id, destino: ''}) : []
      // }
      // if (req.query.origem == '' && req.query.destino !== '') {
      //   console.log("3 CC");

      //   var org = await cityService.findOneByName(req.query.destino)
      //   rotas = org ? await service.listQuery({destino: org.id, origem: ''}) : []
      // }
      // if (req.query.origem == '' && req.query.destino == '') {
      //   console.log("4 DD");

      //   rotas = await service.list();  
      // }
      console.log("vazio");
      
      // console.log("ffff", a[0].origem);
      let userAarray = []
      let b = x.map(async(re)  =>( {
        ...re.dataValues,
        origemName:( await cityService.findOne(re.origem)).name,
        destinyName: (await cityService.findOne(re.destiny)).name
      })
    )
  
      var f = await Promise.all(b)
      console.log(f ? f : []);
      return await res.status(200).json(f);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res, error });
    }
  }
  async index(req, res, next) {
    try {
      
        const rotas = await service.list();  
          //console.log("vazio");
      
      // console.log("ffff", a[0].origem);
      const subr = async   (re)  =>  {
        var ab = await service.findOne(re.router_id)
        const des = await cityService.findOne(ab.destiny)
        return des.name;
      }
      let userAarray = []
      let b = rotas.map(async(re)  =>({
        ...re.dataValues,
        origemName:( await cityService.findOne(re.origem)).name,
        destinyName: (await cityService.findOne(re.destiny)).name,
        subrota: re.router_id ?  await subr(re) : null
      })
    )
    ////console.log('ffffff',await Promise.all(b));
    // let c = await this.teste(rotas)
    //   console.log(c);
    // console.log("aaaavvvv",b);
    // for (const iterator of rotas) {
    //     console.log('eyy', iterator.origem);
    //     userAarray.push((await cityService.findOne(iterator.origem)).dataValues.id)
    //     // console.log(ob.origemName);
    //     //ob['origemName'] =await cityService.findOne(iterator.origem).dataValues.name
    //     v = {...iterator, userAarray}
    //     //console.log(userAarray);
    //     ob['ob'] = (await cityService.findOne(iterator.origem)).dataValues.id 
    //     //t = [...iterator, ...userAarray]
    //     t.push(iterator, userAarray)
    //     //console.log(rotas);
    //   }
     
      // console.log(userAarray);
      //console.log(v);
      //console.log(ob);
      //console.log("////");
      //console.log(t);
      var f = await Promise.all(b)
      return await res.status(200).json(f);
    } catch (error) {
      return res.status(500).json({ res: responseErrorMessage.res, error });
    }
  }

  async delete(req, res, next) {
    try {
      console.log(req.params.id);
      const {id} = req.params;
    
      const deleted =  await service.delete(id);
      const r = await service.findOne(id)
      console.log(r);
      if (deleted) {
        return res.status(200).json({ res: "Rota excluido com sucesso" });
      }
      //return res.status(200).json({ res: "Rota excluido com sucesso" });
    } catch (error) {
      responseError(res);
    }
  }

  async update(req, res, next) {
    try {

      const idUsuario_has_ponto = req.params.id;

      const isUpdate = await service.update(idUsuario_has_ponto, req.body);
      
      if (isUpdate[0] === 1) {
        return res.status(200).json({ res: "Rota atualizado com sucesso" });
      }
    } catch (error) {
      console.log(error);
      responseError(res);
    }
  }

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

module.exports = new RouteController();
