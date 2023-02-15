const fetch = require("node-fetch");
const { getNlbRootUrl } = require("../../helper/helper");

const rootUrl = getNlbRootUrl();

module.exports.getBusArrivalTimeNlb = async (routeId, stopId) => {
  let result = null;

  try {
    const queryParams = new URLSearchParams({
      action: "estimatedArrivals",
      routeId,
      stopId,
      language: "zh",
    });
    const response = await fetch(`${rootUrl}/stop.php?${queryParams}`);
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
