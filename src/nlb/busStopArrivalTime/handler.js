const {
  getBusStopArrivalTimeNlb,
} = require("../../../api/nlb/busStopArrivalTime");

module.exports.busStopArrivalTime = async (event) => {
  console.log("### busStopArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { stopId, language } = event.queryStringParameters;
    if (stopId && language) {
      const getBusStopArrivalTimeNlbResult = await getBusStopArrivalTimeNlb(
        stopId,
        language
      );

      let busStopArrivalTimeNlb = [];
      if (getBusStopArrivalTimeNlbResult) {
        busStopArrivalTimeNlb = getBusStopArrivalTimeNlbResult;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "busStopArrivalTimeNlb",
          busStopArrivalTimeNlb,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "busStopArrivalTimeNlb error, no stopId and language",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
