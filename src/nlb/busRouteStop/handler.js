const {
  getBusRouteStopByBusRouteIdNlb,
} = require("../../../api/nlb/busRouteStop");

module.exports.busRouteStop = async (event) => {
  console.log("### busRouteStop ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { busRouteId } = event.queryStringParameters;
    if (busRouteId) {
      const getBusRouteStopResult = await getBusRouteStopByBusRouteIdNlb(
        busRouteId
      );

      let busRouteStopNlb = [];
      if (getBusRouteStopResult) {
        busRouteStopNlb = getBusRouteStopResult.stops;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteStop",
          busRouteStopNlb,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusRouteStop error, no busRouteId",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
