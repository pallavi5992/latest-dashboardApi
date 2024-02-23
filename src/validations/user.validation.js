const db = require("../models");
const User = db.user;
const Role = db.role;
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addUser = async (req, res, next) => {
  try {
    const {
      Email_Id,
      User_Name,
      Password,
      Organisation,
      Designation,
      captcha,
      captchaHash,
      Mobile_No,
      ModifiedBy,
      UserType,
    } = req.body;
    if (!UserType) {
      return res
        .status(400)
        .send({ status: false, message: "Please select user type!" });
    } else if (!User_Name) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter name!" });
    } else if (!Email_Id) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter email address!" });
    } else if (!isEmail(Email_Id)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter email address!" });
    } else if (!Mobile_No) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter mobile number!" });
    } else if (isNaN(Mobile_No)) {
      return res.status(400).send({
        status: false,
        message: "Please enter valid mobile number!",
      });
    } else if (Mobile_No.length != 10) {
      return res.status(400).send({
        status: false,
        message: "Please enter 10 digits valid mobile number!",
      });
    } else if (!Organisation) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter organisation name!" });
    } else if (!Designation) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter designation name!" });
    } else if (!Password) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter password!" });
    }

    const isRoleExist = await Role.findOne({
      where: {
        Role: UserType,
      },
    });
    if (!isRoleExist) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid user type!" });
    }

    const isEmailExist = await User.findOne({
      where: {
        Email_Id: Email_Id,
      },
    });
    if (isEmailExist) {
      return res
        .status(400)
        .send({ status: false, message: "Email address already exist!" });
    }
    const isPersonalNumberExist = await User.findOne({
      where: {
        Mobile_No: Mobile_No,
      },
    });
    if (isPersonalNumberExist) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile number already taken!" });
    }

    if (!captcha) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter captcha!" });
    }
    if (!captchaHash) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter captcha hash!" });
    }

    const validateCaptch = await bcrypt.compare(
      req.body.captcha,
      req.body.captchaHash
    );

    if (!validateCaptch) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid Captcha!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const user = await User.findOne({
      where: {
        UserId: userId,
        Deleted: "0",
      },
    });
    if (user) {
      return res.status(400).send({ status: false, message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const updateUserByToken = async (req, res,next) => {
  try {
    const {
      Designation,
      Organisation,
      captcha,
      Mobile_No,
      captchaHash,
      oldPassword,
      newPassword,
      confirmPassword,
    } = req.body;
    const token = req.headers["x-access-token"];
    const decodeToken = jwt.decode(token);
    const userId = decodeToken.id;
    const user = await User.findOne({
      where: {
        UserId: userId,
      },
    });
    if(!captcha){
      return res
      .status(400)
      .send({ status: false, message: "Please enter captcha!" });
    }
    const validateCaptch = await bcrypt.compare(captcha,captchaHash);
    if (!validateCaptch) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid Captcha!" });
    }
    if (!user) {
      return res.status(400).send({ status: false, message: "User not found" });
    }
    if(newPassword){
      if(!oldPassword){
        return res.status(400).send({ status: false, message: "Please enter old password" });
      }
      else if(!newPassword){
        return res.status(400).send({ status: false, message: "Please enter old password" });
      }
      else if(!confirmPassword){
        return res.status(400).send({ status: false, message: "Please enter old password" });
      }
      else if(newPassword!=confirmPassword){
        return res.status(400).send({ status: false, message: "Please enter old password" });
      };
      const isOldPassword =await bcrypt.compare(oldPassword,user?.Password);
      console.log(isOldPassword,"sssssssssss");
      if(!isOldPassword){
        return res
        .status(400)
        .send({ status: false, message: "Invalid old password!" });
      }
    };
    if(Mobile_No){
       if (isNaN(Mobile_No)) {
        return res.status(400).send({
          status: false,
          message: "Please enter valid mobile number!",
        });
      } else if (Mobile_No.length != 10) {
        return res.status(400).send({
          status: false,
          message: "Please enter 10 digits valid mobile number!",
        });
      }
      const isMobileNumberExist=await User.findOne({
        where:{
          Mobile_No:Mobile_No
        }
      })
      if(isMobileNumberExist){
        if(isMobileNumberExist.UserId!=userId){
          return res.status(400).send({
            status: false,
            message: "Mobile number already taken!",
          });
        }
      }
    }
    next();
   
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateUserById = async (req, res,next) => {
  try {
    const {
      captcha,
      Mobile_No,
      captchaHash,
    } = req.body;
    const userId=req.query.userId
   
    if(!userId){
      return res
      .status(400)
      .send({ status: false, message: "Please enter userId!" });
    }
    const user = await User.findOne({
      where: {
        UserId: userId,
      },
    });
    if(!captcha){
      return res
      .status(400)
      .send({ status: false, message: "Please enter captcha!" });
    }
    const validateCaptch = await bcrypt.compare(captcha,captchaHash);
    if (!validateCaptch) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid Captcha!" });
    }
    if (!user) {
      return res.status(400).send({ status: false, message: "User not found" });
    };
   
    if(Mobile_No){
       if (isNaN(Mobile_No)) {
        return res.status(400).send({
          status: false,
          message: "Please enter valid mobile number!",
        });
      } else if (Mobile_No.length != 10) {
        return res.status(400).send({
          status: false,
          message: "Please enter 10 digits valid mobile number!",
        });
      }
      const isMobileNumberExist=await User.findOne({
        where:{
          Mobile_No:Mobile_No
        }
      })
      if(isMobileNumberExist){
        if(isMobileNumberExist.UserId!=userId){
          return res.status(400).send({
            status: false,
            message: "Mobile number already taken!",
          });
        }
      }
    }
    next();
   
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  addUser,
  deleteUser,
  updateUserByToken,
  updateUserById
};
