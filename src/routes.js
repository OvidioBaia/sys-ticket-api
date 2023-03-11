const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const usuarioController =  require("./app/controllers/user/UserController")
const StateController =  require("./app/controllers/state/StateController")
const CityController = require("./app/controllers/city/CityController")
const RouterController =  require("./app/controllers/route/RouteController")
const LoginController = require("./app/controllers/login/LoginController")
const CostumerController = require("./app/controllers/costumer/CostumerController")
const PurchaseController = require("./app/controllers/purchase/PurchaseController")

const routes = new Router();

routes.post("/login", asyncHandler(LoginController.Login));
// ponto End-points
//routes.post("/ponto", asyncHandler(pontoController.store));

// routes.get("/ponto", asyncHandler(pontoController.index));

// routes.put("/ponto/:id", asyncHandler(pontoController.update));

// routes.get("/ponto/:id", asyncHandler(pontoController.findOne));

// routes.delete("/ponto/:id", asyncHandler(pontoController.delete));
// 20230216002729-create-route
// usuario End-points
routes.post("/usuario", asyncHandler(usuarioController.store));

routes.get("/usuario", asyncHandler(usuarioController.index));

routes.put("/usuario/:id", asyncHandler(usuarioController.update));

routes.get("/usuario/:id", asyncHandler(usuarioController.findOne));

routes.delete("/usuario/:id", asyncHandler(usuarioController.delete));

// state

routes.post("/state", asyncHandler(StateController.store));

routes.get("/state", asyncHandler(StateController.index));

routes.put("/state/:id", asyncHandler(StateController.update));

routes.get("/state/:id", asyncHandler(StateController.findOne));

routes.delete("/state/:id", asyncHandler(StateController.delete));

// city
routes.post("/city", asyncHandler(CityController.store));

routes.get("/city", asyncHandler(CityController.index));

routes.put("/city/:id", asyncHandler(CityController.update));

routes.get("/city/:id", asyncHandler(CityController.findOne));

routes.delete("/city/:id", asyncHandler(CityController.delete));

// usuario_has_ponto End-points
routes.post("/route", asyncHandler(RouterController.store));
routes.get("/route", asyncHandler(RouterController.index));
routes.get("/route/filter", asyncHandler(RouterController.filter));

routes.get("/route/city/:id", asyncHandler(RouterController.routeByCity));

routes.get("/route/:id", asyncHandler(RouterController.findOne))
routes.put("/route/:id", asyncHandler(RouterController.update));
routes.delete("/route/:id", asyncHandler(RouterController.delete));


routes.post("/costumer", asyncHandler(CostumerController.store));

routes.get("/costumer", asyncHandler(CostumerController.index));

routes.put("/costumer/:id", asyncHandler(CostumerController.update));

routes.get("/costumer/:id", asyncHandler(CostumerController.findOne));

routes.delete("/costumer/:id", asyncHandler(CostumerController.delete));


//purchase

routes.post("/purchase", asyncHandler(PurchaseController.store));

routes.get("/purchase", asyncHandler(PurchaseController.index));
routes.get("/purchase/filter", asyncHandler(PurchaseController.filter));

routes.put("/purchase/:id", asyncHandler(PurchaseController.update));

routes.get("/purchase/:id", asyncHandler(PurchaseController.findOne));

routes.delete("/purchase/:id", asyncHandler(PurchaseController.delete));
module.exports = routes;
