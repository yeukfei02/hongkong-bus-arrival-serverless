const _ = require("lodash");
const KmbBusRoute = require("../../../model/kmbBusRoute");
const { getBusRouteListKmb } = require("../../../api/kmb/busRouteList");

module.exports.busRouteList = async () => {
  let response = {};

  const kmbBusRoute = await KmbBusRoute.scan().all().exec();
  const kmbBusRouteList = kmbBusRoute.toJSON();
  console.log("kmbBusRouteList.length = ", kmbBusRouteList.length);

  if (kmbBusRouteList) {
    const sortedKmbBusRouteList = _.orderBy(
      kmbBusRouteList,
      ["route"],
      ["asc"]
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: sortedKmbBusRouteList,
      }),
    };
  } else {
    const getBusRouteListKmbResult = await getBusRouteListKmb();
    console.log("getBusRouteListKmbResult = ", getBusRouteListKmbResult);

    if (getBusRouteListKmbResult) {
      const sortedKmbBusRouteList = _.orderBy(
        getBusRouteListKmbResult.data,
        ["route"],
        ["asc"]
      );

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteList",
          busRouteList: sortedKmbBusRouteList,
        }),
      };
    }
  }

  return response;
};
