const fetch = require("node-fetch");
const { getNwfbOrCtbRootUrl } = require("../../helper/helper");

const rootUrl = getNwfbOrCtbRootUrl();

module.exports.getBusStop = async (busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/citybus-nwfb/stop/${busStopId}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
