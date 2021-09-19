const { getBusRouteStopKmb } = require("../../../api/kmb/busRouteStop");

module.exports.busRouteStop = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { route, direction } = event.queryStringParameters;
    if (route && direction) {
      const getBusRouteStopKmbResult = await getBusRouteStopKmb(
        route,
        direction
      );
      console.log("getBusRouteStopKmbResult = ", getBusRouteStopKmbResult);

      let busRouteStopKmbList = [];
      if (getBusRouteStopKmbResult) {
        busRouteStopKmbList = getBusRouteStopKmbResult;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteStopKmb",
          busRouteStopKmb: busRouteStopKmbList,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusRouteStopKmb error, no route, direction",
        }),
      };
    }
  }

  return response;
};
