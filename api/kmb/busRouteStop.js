const fetch = require("node-fetch");
const { getKmbRootUrl } = require("../../helper/helper");

const rootUrl = getKmbRootUrl();

module.exports.getBusRouteStopKmb = async (route, direction) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/kmb/route-stop/${route}/${direction}/1`
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
