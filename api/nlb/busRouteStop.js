const fetch = require("node-fetch");
const { getNlbRootUrl } = require("../../helper/helper");

const rootUrl = getNlbRootUrl();

module.exports.getBusRouteStopByBusRouteIdNlb = async (busRouteId) => {
  let busRouteStop = null;

  try {
    const queryParams = new URLSearchParams({
      action: "list",
      routeId: busRouteId,
    });
    const response = await fetch(`${rootUrl}/stop.php?${queryParams}`);
    if (response) {
      busRouteStop = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return busRouteStop;
};
