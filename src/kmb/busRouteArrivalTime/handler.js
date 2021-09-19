const {
  getBusRouteEstimateTimeArrivalKmb,
} = require("../../../api/kmb/busRouteEstimateTimeArrival");

module.exports.busRouteArrivalTime = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { route } = event.queryStringParameters;
    if (route) {
      const getBusRouteEstimateTimeArrivalKmbResult =
        await getBusRouteEstimateTimeArrivalKmb(route);
      console.log(
        "getBusRouteEstimateTimeArrivalKmbResult = ",
        getBusRouteEstimateTimeArrivalKmbResult
      );

      let busRouteArrivalTimeKmbObj = {};
      if (getBusRouteEstimateTimeArrivalKmbResult) {
        busRouteArrivalTimeKmbObj =
          getBusRouteEstimateTimeArrivalKmbResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "busRouteArrivalTimeKmb",
          busRouteArrivalTimeKmb: busRouteArrivalTimeKmbObj,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "busRouteArrivalTimeKmb error, no route",
        }),
      };
    }
  }

  return response;
};
