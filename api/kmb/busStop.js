const fetch = require("node-fetch");
const { getKmbRootUrl } = require("../../helper/helper");

const rootUrl = getKmbRootUrl();

module.exports.getBusStop = async (busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/kmb/stop/${busStopId}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
