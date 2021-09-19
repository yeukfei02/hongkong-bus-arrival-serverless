const { getBusRouteKmb } = require("../../../api/kmb/routeKmb");

module.exports.busRoute = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { route, direction } = event.queryStringParameters;
    if (route && direction) {
      const getBusRouteKmbResult = await getBusRouteKmb(route, direction);
      console.log("getBusRouteKmbResult = ", getBusRouteKmbResult);

      let busRouteKmbObj = {};
      if (getBusRouteKmbResult) {
        busRouteKmbObj = getBusRouteKmbResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteKmb",
          busRouteKmb: busRouteKmbObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusRouteKmb error, no route, direction",
        }),
      };
    }
  }

  return response;
};
