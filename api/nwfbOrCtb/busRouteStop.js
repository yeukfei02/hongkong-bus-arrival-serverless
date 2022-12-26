const fetch = require("node-fetch");
const { getNwfbOrCtbRootUrl } = require("../../helper/helper");

const rootUrl = getNwfbOrCtbRootUrl();

module.exports.getBusRouteStop = async (companyId, routeStr, direction) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/citybus-nwfb/route-stop/${companyId.toUpperCase()}/${routeStr}/${direction}`
    );
    if (response) {
      const responseJson = await response.json();
      result = responseJson.data;
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
