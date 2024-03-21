const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");
const  {sendEmail}  = require("../helper/sendmail");
const {Op}=require("sequelize");
const crypto=require("crypto");

const login = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({
      where: {
        Email_Id: emailId,
      },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    // if (user.firstLogin) {
    //   // Redirect to change password page
    //   return res.redirect('/change-password');
    // }
    const payloads = {
      id: user.UserId,
      roleId: user.UserType,
      role: await helper.getRoleforLogin(user.UserType),
    };
    // expiry time=60second
    const token = jwt.sign(payloads, process.env.JWT_Secret_Key, {
      expiresIn: 60*60,
    });
    await User.update(
      {
        accessToken: token,
      },
      {
        where: {
          UserId: user?.UserId,
        },
      }
    );
    const data={
        id:user.UserId,
        userName:user.User_Name,
        roleId: user.UserType,
        role: await helper.getRole(user.UserType),
        accessToken:token
    };
    return res.status(200).send({status:true,message:"Login successfully",data:data})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const logout = async (req, res) => {
  try {
   const token=req.headers["x-access-token"];
   const newToken=null;
   const tokenData=jwt.decode(token);
   console.log(tokenData.id,"tokenData.id");
   const user=await User.findOne({
    where:{
      UserId:tokenData.id
    }
   })
   if(!user){
    return res.status(401).send({status:false,message:"Unauthorized"})
   }
    await User.update(
      {
        accessToken: newToken,
      },
      {
        where: {
          UserId: user.UserId,
        },
      }
    );
    
    return res.status(200).send({status:true,message:"Logout successfully"})
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

const forgotPassword = async (req, res) => {
  const { emailId } = req.body;
  const user = await User.findOne({
    where: {
      Email_Id: emailId,
    },
  });
  if (!user) {
    return res.status(400).send({ status: false, message: "Email id not register" });
  }
  const resetToken = user.createResetPasswordToken();
  await user.save();

  const resetUrl = `https://ddpdashboard.dpit-ddpmod.online/admin/index/reset/password/${resetToken}`;
  const message = ` Dear User,\n Your password Reset Link\n${resetUrl}\n\n kindly Reset Your password\n Regards\nDDP Dashboard Team\nNote:- This is a sysytem genrated e-mail, Please do not replay to it`;
  const subject = "password change request recevied";



  await sendEmail(user.Email_Id, subject, message);
 return res.status(200).json({
    status: true,
    message: "password reset Link send to the  user email",
  });
};

const resetPasswordRequest = async (req, res) => {
  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
      const user = await User.findOne({
      where: {
        PasswordResetToken: token,
        PasswordResetTokenExpire: { [Op.gt]: Date.now()},
      },
    });

    if (!user) {
      return res.status(400).json({ status: false, message: "User not found or token expired" });
    }

    if (req.body.Password !== req.body.confirmPassword) {
      return res.status(400).json({ status: false, message: "Password does not match" });
    }


    const hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    user.Password = hashedPassword;

    user.PasswordResetToken = null;
    user.PasswordResetTokenExpire = null;
    user.PasswordChangeAt = Date.now();

    await user.save();

    const payloads = {
      userId: user.UserId,
    };

    const loginToken = jwt.sign(payloads, process.env.JWT_Secret_Key, {
      expiresIn: 60 * 60,
    });

    await User.update(
      {
        accessToken: loginToken,
      },
      {
        where: {
          UserId: user.UserId,
        },
      }
    );

    return res.status(200).json({
      status: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
module.exports = {
  login,
  logout,
  forgotPassword,
  resetPasswordRequest,  
};


