const { getCompany } = require("../../../api/nwfbOrCtb/company");

module.exports.company = async (event) => {
  console.log("### company ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { companyId } = event.queryStringParameters;
    if (companyId) {
      const getCompanyResult = await getCompany(companyId);

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

  console.log("response = ", response);

  return response;
};
