const fetch = require("node-fetch");
const { getNlbRootUrl } = require("../../helper/helper");

const rootUrl = getNlbRootUrl();

module.exports.getBusStopListNlb = async (routeId) => {
  let result = null;

  try {
    const queryParams = new URLSearchParams({
      action: "list",
      routeId,
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
