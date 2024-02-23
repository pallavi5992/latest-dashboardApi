const db = require("../../models");
const User = db.user;
const Access=db.access
const Module = db.module;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
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
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
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

const isSuperAdminAdminOrExportModule = async (req, res, next) => {
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
    const exportModule=await Module.findOne({
      where:{
        ModuleName:"Defence Export"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(exportModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdminOrOffsetModule = async (req, res, next) => {
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

const isSuperAdminAdminOrMakeProjectModule = async (req, res, next) => {
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
    const makeProjectModule=await Module.findOne({
      where:{
        ModuleName:"Make Project"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(makeProjectModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const isSuperAdminAdminOrDefenceProductionModule = async (req, res, next) => {
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
    const defenceProductionModule=await Module.findOne({
      where:{
        ModuleName:"Defence Production"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(defenceProductionModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const isSuperAdminAdminOrMRGSModule = async (req, res, next) => {
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
    const mrgsModule=await Module.findOne({
      where:{
        ModuleName:"Mission Raksha Gyan Shakti"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(mrgsModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdminOriDEXModule = async (req, res, next) => {
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
    const iDexModule=await Module.findOne({
      where:{
        ModuleName:"Startups In Defence"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(iDexModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdminUPCorridorModule = async (req, res, next) => {
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
    const upCorridorModule=await Module.findOne({
      where:{
        ModuleName:"Uttar Pradesh Defence Corridor"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(upCorridorModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdminTNCorridorModule = async (req, res, next) => {
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
    const tnCorridorModule=await Module.findOne({
      where:{
        ModuleName:"Tamil Nadu Defence Corridor"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(tnCorridorModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const isSuperAdminAdminAIModule = async (req, res, next) => {
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
    const aiModule=await Module.findOne({
      where:{
        ModuleName:"AI In Defence"
      }
    })
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Unauthorized user" });
    }
    if(!accessModule.includes(aiModule?.ModuleID) &&(tokenData.role != "SuperAdmin" && tokenData.role != "Admin")){
      return res.status(400).send({ status: false, message: "Access dennied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  verifyToken,
  isSuperAdminAdmin,
  isSuperAdminAdminOrExportModule,
  isSuperAdminAdminOrOffsetModule,
  isSuperAdminAdminOrMakeProjectModule,
  isSuperAdminAdminOrDefenceProductionModule,
  isSuperAdminAdminOrMRGSModule,
  isSuperAdminAdminOriDEXModule,
  isSuperAdminAdminUPCorridorModule,
  isSuperAdminAdminTNCorridorModule,
  isSuperAdminAdminAIModule
};
