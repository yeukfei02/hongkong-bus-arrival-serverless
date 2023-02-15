const { getBusArrivalTimeNlb } = require("../../../api/nlb/busArrivalTime");

module.exports.busArrivalTime = async (event) => {
  console.log("### busArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { routeId, stopId } = event.queryStringParameters;
    if (routeId && stopId) {
      const getBusArrivalTimeNlbResult = await getBusArrivalTimeNlb(
        routeId,
        stopId
      );

      let busArrivalTimeNlb = [];
      if (getBusArrivalTimeNlbResult) {
        busArrivalTimeNlb = getBusArrivalTimeNlbResult.estimatedArrivals;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "busArrivalTimeNlb",
          busArrivalTimeNlb,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "busArrivalTimeNlb error, no routeId and stopId",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
