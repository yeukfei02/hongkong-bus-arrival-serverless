const fetch = require("node-fetch");

const ROOT_URL = "https://data.etabus.gov.hk";
module.exports.getBusStopListKmb = async () => {
  let result = null;

  try {
    const response = await fetch(`${ROOT_URL}/v1/transport/kmb/stop`);
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
