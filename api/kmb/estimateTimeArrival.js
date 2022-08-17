const fetch = require("node-fetch");
const { getKmbRootUrl } = require("../../helper/helper");

const rootUrl = getKmbRootUrl();

module.exports.getEstimateTimeArrivalKmb = async (route, busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/kmb/eta/${busStopId}/${route}/1`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
