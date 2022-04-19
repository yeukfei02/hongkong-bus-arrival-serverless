const fetch = require("node-fetch");

const rootUrl = "https://rt.data.gov.hk";

module.exports.getBusRouteList = async (companyId) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/citybus-nwfb/route/${companyId.toUpperCase()}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
