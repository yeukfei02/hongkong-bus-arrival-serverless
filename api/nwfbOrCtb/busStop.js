const fetch = require("node-fetch");

const ROOT_URL = "https://rt.data.gov.hk";
module.exports.getBusStop = async (busStopId) => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/citybus-nwfb/stop/${busStopId}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
