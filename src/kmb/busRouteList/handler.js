const _ = require("lodash");
const KmbBusRoute = require("../../../model/kmbBusRoute");
const { getBusRouteListKmb } = require("../../../api/kmb/busRouteList");

module.exports.busRouteList = async () => {
  console.log("### busRouteList ###");

  let response = {};

  const kmbBusRoute = await KmbBusRoute.scan().all().exec();
  const kmbBusRouteList = kmbBusRoute.toJSON();

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

  console.log("response = ", response);

  return response;
};
