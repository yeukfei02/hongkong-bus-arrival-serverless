const { getBusRouteStopKmb } = require("../../../api/kmb/busRouteStop");

module.exports.busRouteStop = async (event) => {
  console.log("### busRouteStop ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { route, direction } = event.queryStringParameters;
    if (route && direction) {
      const getBusRouteStopKmbResult = await getBusRouteStopKmb(
        route,
        direction
      );

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

  console.log("response = ", response);

  return response;
};
