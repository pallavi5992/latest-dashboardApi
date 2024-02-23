const express=require("express");
const authRoute=require("./auth.route");
const user=require("./user.route")
const role=require("./role.route")
const captchaRoute=require("./captcha.route")
const accessRoute =require("./accessassignment.route")
const moduleRoute = require("./module.route")
const organisationRoute = require("./organistion.route");
const moduleConfigRoute=require("./moduleConfig.route")

const yearRoute = require("./year.route")
const productionPerformanceRoute = require("./productionPerformance.route")
const orderBookPosition=require("./orderBookPosition.route")
const profitability = require("./profitability.route")
const indigenization = require("./indigenization.route")
const newproject = require("./newproject.route")
const modernisationcapex =require("./modernisationcapex.route")
const exportperformance = require("./exportperformance.route")
const modernisationprojects=require("./modernisationprojects.route")
const majorachievment=require("./majorachievment.route")
const router=express.Router();

const defaultRoutes=[
    {
        path:"/auth",
        route:authRoute
    },
    {
        path:"/user",
        route:user
    },
    {
        path:"/role",
        route:role
    },
    {
        path:"/captcha",
        route:captchaRoute
    },
    {
        path:"/access-assignment",
        route:accessRoute
    },
    {
        path:"/module",
        route: moduleRoute
    },
    {
        path:"/organisation",
        route: organisationRoute
    },
    {
        path:"/year",
        route: yearRoute
    },
    {
        path:"/productionPerformance",
        route:productionPerformanceRoute
    },
    {
        path:"/orderBookPosition",
        route:orderBookPosition
    },
    {
        path:"/profitability",
        route:profitability
    },
    {
        path:"/indigenization",
        route:indigenization
    },
    {
        path:"/newproject",
        route:newproject
    },
    {
        path:"/modernisationcapex",
        route:modernisationcapex

    }, {
        path:"/exportperformance",
        route:exportperformance

    },
    {
        path:"/modernisationprojects",
        route:modernisationprojects

    },
    {
        
        path:"/majorachievment",
        route:majorachievment
    },
    {
        path:"/module-config",
        route: moduleConfigRoute
    },
];

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});

module.exports=router