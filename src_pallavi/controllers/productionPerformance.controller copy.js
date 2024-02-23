const db = require("../models");
const sequelize = require("sequelize");
const Organisation = db.organisation;
const prPerformance = db.prProduction;
const Year = db.tblYear;
const pagination = require("../helper/pagination");

const addprPerformanceData = async (req, res) => {
  try {
    const { DPSU, VOP, YearID, Quarter, Remarks } = req.body;
    //const userId = req.userId;
    await prPerformance.create({
      DPSU: DPSU,
      VOP: VOP,
      YearID: YearID,
      Quarter: Quarter,
      Remarks: Remarks,
      Deleted: "1",
      // ModifiedBy: userId,
    });
    return res.status(200).send({
      status: true,
      message: "Add Production Performance Successfully",
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const getAllprPerformanceData = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    const getAllData = await prPerformance.findAndCountAll({
      where: {
        Deleted: "1",
      },
      order: [
        ["ProductionID", "DESC"], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ],
      include: [
        {
          model: Year,
          required: true,
          attributes: ["YearID", "Year"],
          as: "Year",
        },
        {
          model: Organisation,
          required: true,
          attributes: ["OrganisationID", "Name"],
          as: "OrganisationName",
        },
      ],

      attributes: [
        "ProductionID",
        "DPSU",
        "VOP",
        "Quarter",
        "Remarks",
        "Deleted",
      ],

      limit,
      offset,
    });
    const result = pagination.getPagingData(getAllData, page, limit);
    if (getAllData.count !== 0) {
      return res.status(200).json({
        status: true,
        message: "List of production performance data",
        data: result,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "No data found",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getprPerformanceById = async (req, res) => {
  console.log(req.params, "req.params");
  try {
    const { ProductionID } = req.params;
    if (!ProductionID) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter ProductionID" });
    }
    const prProd = await prPerformance.findOne({
      where: {
        ProductionID: ProductionID,
      },
      attributes: ["DPSU", "VOP", "YearID", "Quarter", "Remarks"],
    });

    if (!prProd) {
      return res.status(404).send({
        status: false,
        message: `Data ${ProductionID} not found`,
      });
    }
    return res.status(200).send({
      status: true,
      message: "Data found Successfully",
      data: prProd,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateprPerformanceById = async (req, res) => {
  try {
    const { ProductionID } = req.params;
    const { DPSU, VOP, Quarter, Remarks, ModifiedBy } = req.body;
    if (!ProductionID) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter ProductionID" });
    }
    const prProd = await prPerformance.findOne({
      where: {
        ProductionID: ProductionID,
      },
    });
    if (!prProd) {
      return res.status(404).send({
        status: false,
        message: `Data ${ProductionID} not found`,
      });
    }

    await prPerformance.update(
      { DPSU, VOP, Quarter, Remarks, ModifiedBy },
      { where: { ProductionID } }
    );

    return res.status(200).send({
      status: true,
      message: `Organization updated successfully`,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const deletePrProd = async (req, res) => {
  try {
    const { ProductionID } = req.params;
    await prPerformance.update(
      {
        Deleted: "0",
      },
      {
        where: {
          ProductionID: ProductionID,
        },
      }
    );

    return res
      .status(200)
      .send({ status: true, message: "Organisation deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/**************************************************** percentage & pie chart***********************************************************************/
// const countOrganisation = async (req, res) => {
//   try {
//     const countActiveOrganisation = await Organisation.count({
//       where: { Deleted: "1" },
//     });
//     if (!countActiveOrganisation) {
//       return res.status(404).json({
//         status: false,
//         message: "Organisation Count Failed",
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       message: "Organisation Count Found",
//       data: countActiveOrganisation,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

/**
 * Function to Calculate percentage of organisation based on production performance
 * @param {obj} req, res, next
 * @returns {json} obj
 */
// const OrgTypePrPercentage = async (req, res) => {
//   try {
//     const orgId = req.body.orgId;
//     const countorg = await Organisation.count({
//       where: { Deleted: "1" },
//     });
//     const countOrgByName = await Organisation.count({
//       include: [
//         {
//           model: prPerformance,
//           required: true,
//           attributes: ["DPSU"],
//           as: "DPSUName",
//          // where: { DPSU: orgId },
//         },
//       ],
//       where: {
//         Deleted: "1",
//       },
//     });
//     const orgPercentage = ((countOrgByName / countorg) * 100).toFixed(2);
//     if (!orgPercentage) {
//       return res.status(404).json({
//         status: false,
//         message: `Organisation Not Found`,
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       message: `Organosation Percentage Found`,
//       data: orgPercentage,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// const OrgTypePrPercentage = async (req, res) => {
//   try {
//     const orgId = req.body.orgId;
//     const countorg = await Organisation.count({
//       where: { Deleted: "1" },
//     });
//     const countOrgByName = await Organisation.count({
//       include: [
//         {
//           model: prPerformance,
//           required: true,
//           attributes: ["DPSU"],
//           as: "DPSUName",
//           where: { DPSU: orgId },
//         },
//       ],
//       where: {
//         Deleted: "1",
//       },
//     });
//     const orgPercentage = ((countOrgByName / countorg) * 100).toFixed(2);
//     if (!orgPercentage) {
//       return res.status(404).json({
//         status: false,
//         message: `Organisation Not Found`,
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       message: `Organosation Percentage Found`,
//       data: orgPercentage,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

/**
 * Function to pie chart org for production performance.
 * @param {obj} req, res, next
 * @returns {json} obj
 */
const pieChartOrganisation = async (req, res) => {
  try {
    const countorg = await Organisation.count({
      where: { Deleted: "1" },
    });
    const percentageOrganisationByName = await prPerformance.findAll({
      attributes: ['DPSU', [sequelize.fn('COUNT', 'DPSU'), 'countDPSU'], 'VOP',[sequelize.fn('sum', sequelize.col('VOP')), 'SumofVOP'],[sequelize.fn('AVG', sequelize.cast(sequelize.col('VOP'), 'integer')), 'avgVop'] ],
      group: ['DPSU','VOP'],
      where: { Deleted: "1" },
      include: [
        {
          model: Organisation,
          as: "OrganisationName",
          attributes: ["Code","Name" ],
        right: true,
        where: {
          Deleted: "1"  
        }
        },

        {
          model: Year,
          required: true,
          attributes: ["YearID", "Year"],
          as: "Year",
        },
      ],
      
    });

    // console.log(percentageOrganisationByName.data,"percentageOrganisationByName%^$^$^$^#$%#")
    // const orgPercentage = (
    //   (percentageOrganisationByName / countorg) *
    //   100
    // ).toFixed(2);
    return res.status(200).json({
      status: true,
      message: `Organisation Percentage Found`,
      data: percentageOrganisationByName,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/**
//  * Function to Count Organosation
//  * @param {obj} req, res, next
//  * @returns {json} obj
//  */
// const organisationCount = async (req, res) => {
//   try {
//     const countActiveOrganisation = await Organisation.count({
//       where: { Deleted: "1" },
//     });
//     console.log(countActiveOrganisation, "countActiveOrganisation");
//     const countOrganisation = await Organisation.findAll({
//       attributes: [
//         "Code",
//         "Name",
//         [sequelize.fn("COUNT", sequelize.col("Deleted")), "Code"],
//       ],
//       group: "Code",
//       include: [
//         {
//           model: prPerformance,
//           attributes: { exclude: ["DPSU", "	YearID"] },
//           right: true,
//           where: {
//             Deleted: "1",
//           },
//         },
//       ],
//     });
//     const deviceDashboardCount = {};
//     deviceDashboardCount.totalDeviceCount = totalDeviceCount;
//     deviceDashboardCount.totalInStockDevice = totalInStockDevice;
//     deviceDashboardCount.totalInUseDevice = totalInUseDevice;
//     deviceDashboardCount.totalChetuSideDevice = totalChetuSideDevice;
//     deviceDashboardCount.totalClientSideDevice = totalClientSideDevice;
//     return res.status(200).json({
//       status: true,
//       message: `Organisation Count Found`,
//       data: { countOrganisation, countActiveOrganisation },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  addprPerformanceData,
  getAllprPerformanceData,
  getprPerformanceById,
  updateprPerformanceById,
  deletePrProd,
  // countOrganisation,
 // OrgTypePrPercentage,
  pieChartOrganisation,
 // organisationCount,
};
