const db = require("../models");
const DefeceExportAPI = db.defenceExportApi;
const helper = require("../helper/helper");

function finalyear(id) {
  if (id === 1) {
    return "2016";
  } else if (id == 1) {
    return " 2016-17";
  } else if (id == 2) {
    return "2017-18";
  } else if (id == 3) {
    return "2018-19";
  } else if (id == 4) {
    return "2019-20";
  } else if (id == 4) {
    return "2020-21";
  } else if (id == 4) {
    return "2021-22";
  } else if (id == 4) {
    return "2022-23";
  } else if (id == 4) {
    return "2022-23";
  } else if (id == 4) {
    return "2023-24";
  } else if (id == 4) {
    return "2024-25";
  }
}

const addDefenceExportApiConfig = async (req, res) => {
  try {
    const {
      fin_year,
      dpsu,
      cmy_cat,
      privatecompanies,
      rdate,
      ContractValue,
      ModifiedBy,
    } = req.body;

    await DefeceExportAPI.create({
      fin_year: fin_year,
      dpsu: dpsu,
      cmy_cat: cmy_cat,
      privatecompanies: privatecompanies,
      rdate: rdate,
      ContractValue: ContractValue,
      ModifiedOn: new Date(),
      ModifiedBy: ModifiedBy ? ModifiedBy : 1,
    });
    return res
      .status(200)
      .send({ status: true, message: "add DefenceExportAPI sccessfully!" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAlldefenceExportApiConfig = async (req, res) => {
  try {
    const ApiConfigResult = [];

    console.log("All dtat show ", ApiConfigResult);

    const exportApiConfig = await DefeceExportAPI.findAll({});

    const finYearSum = {};
    console.log("yearly sum", finYearSum);

    for (let i = 0; i < exportApiConfig.length; i++) {
      const finYear = exportApiConfig[i].fin_year;

      if (!finYearSum[finYear]) {
        finYearSum[finYear] = {
          dpsu: 0,
          cmy_cat: 0,
          privatecompanies: 0,
          ContractValue: 0,
        };
      }

      finYearSum[finYear].dpsu += exportApiConfig[i].dpsu
        ? JSON.parse(exportApiConfig[i].dpsu)
        : 0;

      finYearSum[finYear].cmy_cat += exportApiConfig[i].cmy_cat
        ? JSON.parse(exportApiConfig[i].cmy_cat)
        : 0;

      finYearSum[finYear].privatecompanies += exportApiConfig[i]
        .privatecompanies
        ? JSON.parse(exportApiConfig[i].privatecompanies)
        : 0;

      finYearSum[finYear].ContractValue += exportApiConfig[i].ContractValue
        ? JSON.parse(exportApiConfig[i].ContractValue)
        : 0;

      ApiConfigResult.push({
        fin_year: finYear ? finalyear(finYear) : "",
        dpsu: exportApiConfig[i].dpsu
          ? JSON.parse(exportApiConfig[i].dpsu)
          : "",
        cmy_cat: exportApiConfig[i].cmy_cat
          ? JSON.parse(exportApiConfig[i].cmy_cat)
          : "",
        privatecompanies: exportApiConfig[i].privatecompanies
          ? JSON.parse(exportApiConfig[i].privatecompanies)
          : "",
        rdate: exportApiConfig[i].rdate
          ? moment(exportApiConfig[i].rdate, ["YYYY-MM-DD"]).format(
              "DD-MM-YYYY"
            )
          : "",
        ContractValue: exportApiConfig[i].ContractValue
          ? JSON.parse(exportApiConfig[i].ContractValue)
          : "",
        ModifiedBy: exportApiConfig[i].ModifiedBy
          ? await helper.userName(exportApiConfig[i].ModifiedBy)
          : "",
      });
    }

    for (const finYear in finYearSum) {
      ApiConfigResult.push({
        fin_year: finalyear(finYear),
        dpsu: finYearSum[finYear].dpsu,
        cmy_cat: finYearSum[finYear].cmy_cat,
        privatecompanies: finYearSum[finYear].privatecompanies,
        ContractValue: finYearSum[finYear].ContractValue,
      });
    }

    return res.status(200).send({
      status: true,
      message: "data found",
      data: ApiConfigResult,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAlldefenceExportApiConfig1 = async (req, res) => {
  try {
    const ApiconfigResult = [];

    const exportApiConfig = await DefeceExportAPI.findAll({});
    for (let i = 0; i < exportApiConfig.length; i++) {
      ApiconfigResult.push({
        fin_year: exportApiConfig[i].fin_year
          ? finalyear(exportApiConfig[i].fin_year)
          : "",
        dpsu: exportApiConfig[i].dpsu
          ? JSON.parse(exportApiConfig[i].dpsu)
          : "",
        cmy_cat: exportApiConfig[i].cmy_cat
          ? JSON.parse(exportApiConfig[i].cmy_cat)
          : "",
        privatecompanies: exportApiConfig[i].privatecompanies
          ? JSON.parse(exportApiConfig[i].privatecompanies)
          : "",
        rdate: exportApiConfig[i].rdate
          ? moment(exportApiConfig[i].rdate, ["YYYY-MM-DD"]).format(
              "DD-MM-YYYY"
            )
          : "",
        ContractValue: exportApiConfig[i].ContractValue
          ? JSON.parse(exportApiConfig[i].ContractValue)
          : "",
        ModifiedBy: exportApiConfig[i].ModifiedBy
          ? await helper.userName(exportApiConfig[i].ModifiedBy)
          : "",
      });
    }
    return res
      .status(200)
      .send({ status: true, message: "data found", data: ApiconfigResult });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  addDefenceExportApiConfig,
  getAlldefenceExportApiConfig,
  getAlldefenceExportApiConfig1,
};
