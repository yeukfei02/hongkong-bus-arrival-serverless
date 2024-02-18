const fetch = require("node-fetch");
const { getNwfbOrCtbRootUrl } = require("../../helper/helper");

const rootUrl = getNwfbOrCtbRootUrl();

async function getBusStopById(busStopId) {
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
}

module.exports.getBusRouteStop = async (companyId, routeStr, direction) => {
  let results = [];

  try {
    const response = await fetch(
      `${rootUrl}/v1/transport/citybus-nwfb/route-stop/${companyId.toUpperCase()}/${routeStr}/${direction}`
    );
    if (response) {
      const responseJson = await response.json();
      if (responseJson) {
        results = responseJson.data;
      }
    }
  } catch (e) {
    console.log("error = ", e);
  }

  const busRouteStops = [];
  if (results) {
    for (let index = 0; index < results.length; index++) {
      const item = results[index];
      const busStopId = item.stop;
      const busStopDetails = await getBusStopById(busStopId);

      const newItem = Object.assign(item, { stop: busStopDetails.data });
      busRouteStops.push(newItem);
    }
  }

  return busRouteStops;
};
