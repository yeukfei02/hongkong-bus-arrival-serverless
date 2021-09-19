const { getBusStopListKmb } = require("../../../api/kmb/busStopList");

module.exports.busStopList = async () => {
  let response = {};

  const getBusStopListKmbResult = await getBusStopListKmb();
  console.log("getBusStopListKmbResult = ", getBusStopListKmbResult);

  if (getBusStopListKmbResult) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: getBusStopListKmbResult.data,
      }),
    };
  }

  return response;
};
