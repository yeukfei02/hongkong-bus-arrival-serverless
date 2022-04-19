const _ = require("lodash");
const NwfbOrCtbBusRoute = require("../../../model/nwfbOrCtbBusRoute");
const { getBusRouteList } = require("../../../api/nwfbOrCtb/busRouteList");

module.exports.busRouteList = async () => {
  let response = {};

  const nwfbOrCtbBusRoute = await NwfbOrCtbBusRoute.scan().all().exec();
  const nwfbOrCtbBusRouteList = nwfbOrCtbBusRoute.toJSON();
  console.log("nwfbOrCtbBusRouteList.length = ", nwfbOrCtbBusRouteList.length);

  if (nwfbOrCtbBusRouteList) {
    const sortedNwfbOrCtbBusRouteList = _.orderBy(
      nwfbOrCtbBusRouteList,
      ["route"],
      ["asc"]
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: sortedNwfbOrCtbBusRouteList,
      }),
    };
  } else {
    const getBusRouteListResult = await getBusRouteList();
    console.log("getBusRouteListResult = ", getBusRouteListResult);

    if (getBusRouteListResult) {
      const sortedNwfbOrCtbBusRouteList = _.orderBy(
        getBusRouteListResult.data,
        ["route"],
        ["asc"]
      );

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteList",
          busRouteList: sortedNwfbOrCtbBusRouteList,
        }),
      };
    }
  }

  return response;
};
