const { getBusRouteListKmb } = require("../../../api/kmb/busRouteList");

module.exports.busRouteList = async () => {
  let response = {};

  const getBusRouteListKmbResult = await getBusRouteListKmb();
  console.log("getBusRouteListKmbResult = ", getBusRouteListKmbResult);

  if (getBusRouteListKmbResult) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: getBusRouteListKmbResult.data,
      }),
    };
  }

  return response;
};
