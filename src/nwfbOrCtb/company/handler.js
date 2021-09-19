const { getCompany } = require("../../../api/nwfbOrCtb/company");

module.exports.company = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { companyId } = event.queryStringParameters;
    if (companyId) {
      const getCompanyResult = await getCompany(companyId);
      console.log("getCompanyResult = ", getCompanyResult);

      let companyObj = {};
      if (getCompanyResult) {
        companyObj = getCompanyResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getCompany",
          company: companyObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getCompany error, no companyId",
        }),
      };
    }
  }

  return response;
};
