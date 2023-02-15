const {
  getBusStopEstimateTimeArrival,
} = require("../../../api/nwfbOrCtb/busStopEstimateTimeArrival");

module.exports.busStopArrivalTime = async (event) => {
  console.log("### busStopArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { busStopId, language } = event.queryStringParameters;
    if (busStopId && language) {
      const getBusStopEstimateTimeArrivalResult =
        await getBusStopEstimateTimeArrival(busStopId, language);

      let busStopArrivalTimeObj = {};
      if (getBusStopEstimateTimeArrivalResult) {
        busStopArrivalTimeObj = getBusStopEstimateTimeArrivalResult;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStopArrivalTime",
          busStopArrivalTime: busStopArrivalTimeObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusStopArrivalTime error, no busStopId and language",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
