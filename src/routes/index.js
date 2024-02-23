const express = require("express");
const authRoute = require("./auth.route");
const user = require("./user.route");
const role = require("./role.route");
const captchaRoute = require("./captcha.route");
const accessRoute = require("./accessassignment.route");
const moduleRoute = require("./module.route");
const organisationRoute = require("./organistion.route");
const moduleConfigRoute = require("./moduleConfig.route");
const discMsterRoute = require("./discMaster.route");
const locationRoute = require("./location.route");
const defenceChallangeRoute = require("./defenceChallange.route");
const defenceExportApiRoute = require("./defenceExportApi.route");
const defenceOffsetroute = require("./defenceOffset.route");
const defenceProductionRoute = require("./defenceProduction.route");
const mrgsRoute = require("./mrgs.route");
const makeProjectRoute = require("./makeProject/makeProject.route");
const makeProjectRoute1=require("./makeProject/makeProject1.route");
const makeProject2DAPRoute= require("./makeProject/makeProject2Dap.route");
const makeProject2DPSURoute= require("./makeProject/makeProject2Dpsu.route");
const  makeProjectRoute3 = require('./makeProject3/makeProject3.route');
const makeProjectRoute3dap=require("./makeProject3/makeProject3dap.route");
const makeProject3dpsuRoute=require("./makeProject3/makeProject3dpsu.route");
const idexRoute=require("./idex.route");
const upDefenecCorridorRoute=require("./upDefenceCorridor.route");
const tlDefenecCorridorRoute=require("./tnDefenceCorridor.route");
const aiDefenecCorridorRoute=require("./aiDefenceCorridor.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: user,
  },
  {
    path: "/role",
    route: role,
  },
  {
    path: "/captcha",
    route: captchaRoute,
  },
  {
    path: "/access-assignment",
    route: accessRoute,
  },
  {
    path: "/module",
    route: moduleRoute,
  },
  {
    path: "/organisation",
    route: organisationRoute,
  },
  {
    path: "/module-config",
    route: moduleConfigRoute,
  },
  {
    path: "/disc-master",
    route: discMsterRoute,
  },
  {
    path: "/location",
    route: locationRoute,
  },
  {
    path: "/defence-challange",
    route: defenceChallangeRoute,
  },
  {
    path: "/defence-export-api",
    route: defenceExportApiRoute,
  },
  {
    path: "/defence-offset",
    route: defenceOffsetroute,
  },
  {
    path: "/defence-production",
    route: defenceProductionRoute,
  },
  {
    path: "/mrgs",
    route: mrgsRoute,
  },
  {
    path: "/make-project",
    route: makeProjectRoute,
  },
  {
    path: "/make-project-one",
    route: makeProjectRoute1,
  },
  {
    path:"/make-Project2DAP",
    route: makeProject2DAPRoute
  },
  {
    path:"/make-project2dpsu",
    route: makeProject2DPSURoute
  },
  {
    path:"/make-Project3",
    route: makeProjectRoute3
},
{
  path:"/make-Project3dap",
  route: makeProjectRoute3dap
},
{
  path:"/make-Project3dpsu",
  route: makeProject3dpsuRoute
},
{
  path:"/idex",
  route: idexRoute
},
{
  path:"/up-defence-corridor",
  route:upDefenecCorridorRoute
},
{
  path:"/tl-defence-corridor",
  route:tlDefenecCorridorRoute
},
{
  path:"/ai-defence-corridor",
  route:aiDefenecCorridorRoute
}
  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
