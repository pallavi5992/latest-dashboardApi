const addmakeProject3DPSU =async(req, res, next)=>{
    try {
        const{ 
            OrganisationID,
            itemCode_PartNo,
            Name_of_Project,
            AIP_Date,
            EOI_Date,
            Contract_Date,
            Withdrawn_On,}=req.body
            if(!OrganisationID){
                return res
                .status(400)
                .send({status:false, message:"Please select Organisation!"});
              }else if(!itemCode_PartNo){
                return res
                .status(400)
                .send({status: false, message:"Please Enter itemCode!"})
            }else if(!Name_of_Project){
                return res 
                .status(400)
                .send({status: false, message:"Please select Date!"})
            }else if (!AIP_Date){
                return res
                .status(400)
                .send({status:false, message:"Please select Date!"})
            }else if (!EOI_Date){
                return res
                .status(400)
                .send({status:false, message:"Please select Date!"})
            }else if (!Contract_Date){
                return res
                .status(400)
                .send({status:false, message:"Please select Date!"})
            }
            else if (!Withdrawn_On){
                return res
                .status(400)
                .send({status:false, message:"Please select Date!"})
            }
            next()
            } catch (error) {
                return res .status(500) .send({status:false , message:error.message})
                
            }
}
module.exports={
    addmakeProject3DPSU
}