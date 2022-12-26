const { getBusStop } = require("../../../api/kmb/busStop");

module.exports.busStop = async (event) => {
  console.log("### busStop ###");
  console.log("event.pathParameters = ", event.pathParameters);

  let response = {};

  if (event.pathParameters) {
    const { busStopId } = event.pathParameters;
    if (busStopId) {
      const getBusStopResult = await getBusStop(busStopId);

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

  console.log("response = ", response);

  return response;
};
