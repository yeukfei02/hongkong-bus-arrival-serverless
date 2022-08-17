const fetch = require("node-fetch");
const _ = require("lodash");
const { getKmbRootUrl } = require("../../helper/helper");

const rootUrl = getKmbRootUrl();

module.exports.getBusStopEstimateTimeArrivalKmb = async (busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/kmb/stop-eta/${busStopId}`
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
