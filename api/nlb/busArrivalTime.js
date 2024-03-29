const fetch = require("node-fetch");
const { getNlbRootUrl } = require("../../helper/helper");

const rootUrl = getNlbRootUrl();

module.exports.getBusArrivalTimeNlb = async (
  busRouteId,
  busStopId,
  language
) => {
  let busArrivalTime = null;

  try {
    const queryParams = new URLSearchParams({
      action: "estimatedArrivals",
      routeId: busRouteId,
      stopId: busStopId,
      language: language || "zh",
    });
    const response = await fetch(`${rootUrl}/stop.php?${queryParams}`);
    if (response) {
      busArrivalTime = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return busArrivalTime;
};
