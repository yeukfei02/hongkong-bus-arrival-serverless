const { getBusArrivalTimeNlb } = require("../../../api/nlb/busArrivalTime");

module.exports.busArrivalTime = async (event) => {
  console.log("### busArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { busRouteId, busStopId, language } = event.queryStringParameters;
    if (busRouteId && busStopId && language) {
      const getBusArrivalTimeResult = await getBusArrivalTimeNlb(
        busRouteId,
        busStopId,
        language
      );

      let busArrivalTimeNlb = [];
      if (getBusArrivalTimeResult) {
        busArrivalTimeNlb = getBusArrivalTimeResult.estimatedArrivals;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusArrivalTime",
          busArrivalTimeNlb,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "getBusArrivalTime error, no busRouteId and busStopId and language",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
