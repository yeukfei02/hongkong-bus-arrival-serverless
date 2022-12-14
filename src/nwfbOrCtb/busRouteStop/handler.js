const { getBusRouteStop } = require("../../../api/nwfbOrCtb/busRouteStop");

module.exports.busRouteStop = async (event) => {
  console.log("### busRouteStop ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { companyId, routeStr, direction } = event.queryStringParameters;
    if (companyId && routeStr && direction) {
      const getBusRouteStopResult = await getBusRouteStop(
        companyId,
        routeStr,
        direction
      );

      let busRouteStopObj = {};
      if (getBusRouteStopResult) {
        busRouteStopObj = getBusRouteStopResult;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteStop",
          busRouteStop: busRouteStopObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "getBusRouteStop error, no companyId and routeStr and direction",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
