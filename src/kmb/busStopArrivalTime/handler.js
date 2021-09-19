const {
  getBusStopEstimateTimeArrivalKmb,
} = require("../../../api/kmb/busStopEstimateTimeArrival");

module.exports.busStopArrivalTime = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { busStopId } = event.queryStringParameters;
    if (busStopId) {
      const getBusStopEstimateTimeArrivalKmbResult =
        await getBusStopEstimateTimeArrivalKmb(busStopId);
      console.log(
        "getBusStopEstimateTimeArrivalKmbResult = ",
        getBusStopEstimateTimeArrivalKmbResult
      );

      let busStopArrivalTimeKmbObj = {};
      if (getBusStopEstimateTimeArrivalKmbResult) {
        busStopArrivalTimeKmbObj = getBusStopEstimateTimeArrivalKmbResult;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStopArrivalTimeKmb",
          busStopArrivalTimeKmb: busStopArrivalTimeKmbObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusStopArrivalTimeKmb error, no busStopId",
        }),
      };
    }
  }

  return response;
};
