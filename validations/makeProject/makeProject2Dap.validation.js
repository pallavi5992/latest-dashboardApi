const addmakeProject2DAP= async(req, res, next)=>{
    try {
      const{
        SHQ,
        Name_of_Project,
        AIP_Date,
        AON_Date,
        PSO_Date,
        Withdrawn_On,
      }=req.body;

      if(!SHQ){
        return res
        .status(400)
        .send({status:false, message:"Please select SHQ!"});
      }else if(!Name_of_Project){
        return res
        .status(400)
        .send({status: false, message:"Please Enter the Project Name!"})
    }else if(!AIP_Date){
        return res 
        .status(400)
        .send({status: false, message:"Please select Date!"})
    }else if (!AON_Date){
        return res
        .status(400)
        .send({staus:false, message:"Please select Date!"})
    }else if (!PSO_Date){
        return res
        .status(400)
        .send({staus:false, message:"Please select Date!"})
    }else if (!Withdrawn_On){
        return res
        .status(400)
        .send({staus:false, message:"Please select Date!"})
    }
    next()
    } catch (error) {
        
    }
}
module.exports={
    addmakeProject2DAP
}