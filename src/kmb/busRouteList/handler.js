const KmbBusRoute = require("../../../model/kmbBusRoute");
const { getBusRouteListKmb } = require("../../../api/kmb/busRouteList");

module.exports.busRouteList = async () => {
  let response = {};

  const kmbBusRoute = await KmbBusRoute.scan().all().exec();
  const kmbBusRouteList = kmbBusRoute.toJSON();
  console.log("kmbBusRouteList.length = ", kmbBusRouteList.length);

  if (kmbBusRouteList) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: kmbBusRouteList,
      }),
    };
  } else {
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
  }

  return response;
};
