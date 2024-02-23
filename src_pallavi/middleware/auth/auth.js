const db = require("../../models");
const User = db.user;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      console.log(!token);
      return res
        .status(401)
        .send({ status: false, message: "No token provided" });
    }

    const tokenData = jwt.decode(token);
    if (!token) {
      return res.status(401).send({ status: false, message: "Unauthorized" });
    }

    const user = await User.findOne({
      where: {
        UserId: tokenData.id,
      },
    });
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }

    if (user.accessToken == token) {
      jwt.verify(token, process.env.JWT_Secret_Key, (err, decoded) => {
        if (err) {
          console.log(err)
          return res
            .status(401)
            .send({ status: false, message: "Unauthorized b" });
        }
        req.userId = decoded.id;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ status: false, message: "User token not matched!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      console.log(!token);
      return res.status(401).send({ status: false, message: "Access dennied" });
    }
    const tokenData = jwt.decode(token);
    if (!token) {
      return res.status(401).send({ status: false, message: "Unauthorized" });
    }
    const user = await User.findOne({
      where: {
        UserId: tokenData.id,
      },
    });
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if (tokenData.role != "SuperAdmin" && tokenData.role != "Admin") {
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


/************************************New Authorization for Organisation***********************************************/
const isSuperAdminAdminOrDPSU = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      console.log(!token);
      return res.status(401).send({ status: false, message: "Access dennied" });
    }
    const tokenData = jwt.decode(token);
    if (!token) {
      return res.status(401).send({ status: false, message: "Unauthorized" });
    }
    const user = await User.findOne({
      where: {
        UserId: tokenData.id,
      },
    });
    const accessUserModule=await Access.findOne({
      where:{
        UserID:tokenData.id
      },
      attributes:["ModuleID"]
    })
    const accessModule=accessUserModule?JSON.parse(accessUserModule?.ModuleID):[]
    const offsetModule=await Module.findOne({
      where:{
        ModuleName:"Defence Offset"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(offsetModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
/************************************New Authorization***********************************************/
module.exports = {
  verifyToken,
  isSuperAdminAdmin,

};
