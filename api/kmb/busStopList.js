const fetch = require("node-fetch");

const rootUrl = "https://data.etabus.gov.hk";

module.exports.getBusStopListKmb = async () => {
  let result = null;

  try {
    const response = await fetch(`${rootUrl}/v1/transport/kmb/stop`);
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
