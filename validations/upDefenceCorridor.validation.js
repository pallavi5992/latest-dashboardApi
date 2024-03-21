const addupdefencecorridor =async(req, res, next)=>{
    try {
        const{ 
           
          Sector,
          OrganisationID,
          Investment,
          Project
        }=req.body
            if(!Sector){
                return res
                .status(400)
                .send({status:false, message:"Please select Sector!"});
              }else if(!OrganisationID){
                return res
                .status(400)
                .send({status: false, message:"Please select Organisation!"})
            }else if(!Investment){
                return res 
                .status(400)
                .send({status: false, message:"Please Enter Investment!"})
            }else if (!Project){
                return res
                .status(400)
                .send({status:false, message:"Please Enter the Project Description!"})
            }
            next()
            } catch (error) {
                return res .status(500) .send({status:false , message:error.message})
                
            }
}
const addUpInvestmentDefecneCorridor =async(req, res, next)=>{
    try {
        const{ 
           
            InvestmentTarget,
            InvestmentMade,
            AS_On_Date,
        }=req.body
            if(!InvestmentTarget){
                return res
                .status(400)
                .send({status:false, message:"Please Enter Investment Target!"});
              }else if(!InvestmentMade){
                return res
                .status(400)
                .send({status: false, message:"Please Enter Investment Made so far!"})
            }else if(!AS_On_Date){
                return res 
                .status(400)
                .send({status: false, message:"Please select As on Date!"})
            }
            next()
            } catch (error) {
                return res .status(500) .send({status:false , message:error.message})
                
            }
}
module.exports={
    addupdefencecorridor,
    addUpInvestmentDefecneCorridor
}