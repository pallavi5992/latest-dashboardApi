const db = require("../../models");
const FyYear = db.tblYear
const Organisation= db.organisation
const MakeProject3DPSU = db.makeProject3DPSU;

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

// const checkIfDataExists = async (organisationID, Name_of_Project, itemCode_PartNo) => {
//     try {
//       const existingRecord = await MakeProject3DPSU.findOne({
//         where: {
//           OrganisationID: organisationID,
//           Name_of_Project: Name_of_Project,
//           itemCode_PartNo: itemCode_PartNo,
//         },
//       });
  
//       return !!existingRecord; // Return true if the record exists, false otherwise
//     } catch (error) {
//       console.error('Error checking if record exists:', error);
//       return false;
//     }
//   };
// const updatedefenceProduction= async(req, res, next)=>{
//     try {
//         const {
//             OrganisationID,
//             itemCode_PartNo,
//             Name_of_Project,
//             AIP_Date,
//             EOI_Date,
//             Contract_Date,
//             Withdrawn_On
//           } = req.body;
//         if(!OrganisationID){
//             return res
//             .status(400)
//             .send({status:false, message:"Please select Organisation!"});
//           }else if(!itemCode_PartNo){
//             return res
//             .status(400)
//             .send({status: false, message:"Please Enter itemCode!"})
//         }else if(!Name_of_Project){
//             return res 
//             .status(400)
//             .send({status: false, message:"Please select Date!"})
//         }else if (!AIP_Date){
//             return res
//             .status(400)
//             .send({status:false, message:"Please select Date!"})
//         }else if (!EOI_Date){
//             return res
//             .status(400)
//             .send({status:false, message:"Please select Date!"})
//         }else if (!Contract_Date){
//             return res
//             .status(400)
//             .send({status:false, message:"Please select Date!"})
//         }
//         else if (!Withdrawn_On){
//             return res
//             .status(400)
//             .send({status:false, message:"Please select Date!"})
//         }

//     const OrgExist = await Organisation.findOne({
//         where: {
//             OrganisationID: OrganisationID,
//         },
//       });
//       if (!OrgExist) {
//         return res
//           .status(400)
//           .send({ status: false, message: "Organisation not exist" });
//       }
   
//     const quarter = [1,2,3,4]
//     const checkquarter = quarter.includes(Quarter)

//     if(!checkquarter){
//       return res
//       .status(400)
//       .send({ status: false, message: "Invalid Quarter" });
//     }

//     const recordExists = await checkIfDataExists(DPSU, YearID, Quarter);
//     if (recordExists) {
//       return res
//       .status(400)
//       .send({ status: false, message: "Record already exists." });
//     } 

//     next()
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message }); 
//     }
// }
module.exports={
    addmakeProject3DPSU,
   // updatedefenceProduction
    
}