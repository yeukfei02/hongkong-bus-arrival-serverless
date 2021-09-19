const fetch = require("node-fetch");

const ROOT_URL = "https://rt.data.gov.hk";

async function getBusStopById(busStopId) {
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
}

module.exports.getBusRouteStop = async (companyId, routeStr, direction) => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/citybus-nwfb/route-stop/${companyId.toUpperCase()}/${routeStr}/${direction}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  const finalResultList = [];
  if (result && result.data) {
    const resultList = result.data;
    for (let index = 0; index < resultList.length; index++) {
      const item = resultList[index];
      const busStopId = item.stop;
      const busStopDetails = await getBusStopById(busStopId);

      const newItem = Object.assign(item, { stop: busStopDetails.data });
      finalResultList.push(newItem);
    }
  }

  return finalResultList;
};
