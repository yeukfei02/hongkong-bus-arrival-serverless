const { getBusStop } = require("../../../api/nwfbOrCtb/busStop");

module.exports.busStop = async (event) => {
  let response = {};

  if (event.pathParameters) {
    const { busStopId } = event.pathParameters;
    if (busStopId) {
      const getBusStopResult = await getBusStop(busStopId);
      console.log("getBusStopResult = ", getBusStopResult);

      let busStopObj = {};
      if (getBusStopResult) {
        busStopObj = getBusStopResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStop",
          busStop: busStopObj,
        }),
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStop error, no busStopId",
        }),
      };
    }
  }

  return response;
};
