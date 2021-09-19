const fetch = require("node-fetch");
const _ = require("lodash");

const ROOT_URL = "https://data.etabus.gov.hk";
module.exports.getBusStopEstimateTimeArrivalKmb = async (busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/kmb/stop-eta/${busStopId}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  let finalResultList = [];
  if (result && result.data) {
    finalResultList = _.groupBy(result.data, "route");
  }

  return finalResultList;
};
