const {
  getEstimateTimeArrivalKmb,
} = require("../../../api/kmb/estimateTimeArrival");

module.exports.busArrivalTime = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { route, busStopId } = event.queryStringParameters;
    if (route && busStopId) {
      const getEstimateTimeArrivalKmbResult = await getEstimateTimeArrivalKmb(
        route,
        busStopId
      );
      console.log(
        "getEstimateTimeArrivalKmbResult = ",
        getEstimateTimeArrivalKmbResult
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

  return response;
};
