const {
  getEstimateTimeArrivalKmb,
} = require("../../../api/kmb/estimateTimeArrival");

module.exports.busArrivalTime = async (event) => {
  console.log("### busArrivalTime ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { route, busStopId } = event.queryStringParameters;
    if (route && busStopId) {
      const getEstimateTimeArrivalKmbResult = await getEstimateTimeArrivalKmb(
        route,
        busStopId
      );

      let busArrivalTimeKmbList = [];
      if (getEstimateTimeArrivalKmbResult) {
        busArrivalTimeKmbList = getEstimateTimeArrivalKmbResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusArrivalTimeKmb",
          busArrivalTimeKmb: busArrivalTimeKmbList,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusArrivalTimeKmb error, no route and busStopId",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
