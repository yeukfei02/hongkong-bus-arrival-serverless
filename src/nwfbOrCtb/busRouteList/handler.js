const NwfbOrCtbBusRoute = require("../../../model/nwfbOrCtbBusRoute");
const { getBusRouteList } = require("../../../api/nwfbOrCtb/busRouteList");

module.exports.busRouteList = async () => {
  let response = {};

  const nwfbOrCtbBusRoute = await NwfbOrCtbBusRoute.scan().all().exec();
  const nwfbOrCtbBusRouteList = nwfbOrCtbBusRoute.toJSON();
  console.log("nwfbOrCtbBusRouteList.length = ", nwfbOrCtbBusRouteList.length);

  if (nwfbOrCtbBusRouteList) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: nwfbOrCtbBusRouteList,
      }),
    };
  } else {
    const getBusRouteListResult = await getBusRouteList();
    console.log("getBusRouteListResult = ", getBusRouteListResult);

    if (getBusRouteListResult) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteList",
          busRouteList: getBusRouteListResult.data,
        }),
      };
    }
  }

  return response;
};
