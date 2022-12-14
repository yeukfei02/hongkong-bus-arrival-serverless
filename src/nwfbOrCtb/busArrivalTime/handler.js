const {
  getEstimateTimeArrival,
} = require("../../../api/nwfbOrCtb/estimateTimeArrival");

module.exports.busArrivalTime = async (event) => {
  console.log("### busArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { companyId, routeStr, busStopId } = event.queryStringParameters;
    if (companyId && routeStr && busStopId) {
      const getEstimateTimeArrivalResult = await getEstimateTimeArrival(
        companyId,
        routeStr,
        busStopId
      );

      let busArrivalTimeObj = {};
      if (getEstimateTimeArrivalResult) {
        busArrivalTimeObj = getEstimateTimeArrivalResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusArrivalTime",
          busArrivalTime: busArrivalTimeObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "getBusArrivalTime error, no companyId and routeStr and busStopId",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
