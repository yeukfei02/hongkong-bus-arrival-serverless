const { getBusRouteKmb } = require("../../../api/kmb/routeKmb");

module.exports.busRoute = async (event) => {
  console.log("### busRoute ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { route, direction } = event.queryStringParameters;
    if (route && direction) {
      const getBusRouteKmbResult = await getBusRouteKmb(route, direction);

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
          message: "getBusRouteKmb error, no route and direction",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
