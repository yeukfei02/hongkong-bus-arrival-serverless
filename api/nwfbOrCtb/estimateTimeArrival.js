const fetch = require("node-fetch");

const ROOT_URL = "https://rt.data.gov.hk";
module.exports.getEstimateTimeArrival = async (
  companyId,
  routeStr,
  busStopId
) => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/citybus-nwfb/eta/${companyId}/${busStopId}/${routeStr}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
