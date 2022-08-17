const fetch = require("node-fetch");
const { getKmbRootUrl } = require("../../helper/helper");

const rootUrl = getKmbRootUrl();

module.exports.getBusRouteListKmb = async () => {
  let result = null;

  try {
    const response = await fetch(`${rootUrl}/v1/transport/kmb/route`);
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
