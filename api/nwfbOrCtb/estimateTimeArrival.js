const fetch = require("node-fetch");

const rootUrl = "https://rt.data.gov.hk";

module.exports.getEstimateTimeArrival = async (
  companyId,
  routeStr,
  busStopId
) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/citybus-nwfb/eta/${companyId}/${busStopId}/${routeStr}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
