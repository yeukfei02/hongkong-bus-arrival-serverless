const _ = require("lodash");
const NlbBusRoute = require("../../../model/nlbBusRoute");
const { getBusRouteListNlb } = require("../../../api/nlb/busRouteList");

module.exports.busRouteList = async () => {
  console.log("### busRouteList ###");

  let response = {};

  const nlbBusRoute = await NlbBusRoute.scan().all().exec();
  const nlbBusRouteList = nlbBusRoute.toJSON();

  if (nlbBusRouteList) {
    const sortedNlbBusRouteList = _.orderBy(
      nlbBusRouteList,
      ["routeNo"],
      ["asc"]
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusRouteList",
        busRouteList: sortedNlbBusRouteList,
      }),
    };
  } else {
    const getBusRouteListNlbResult = await getBusRouteListNlb();

    if (getBusRouteListNlbResult) {
      const sortedNlbBusRouteList = _.orderBy(
        getBusRouteListNlbResult.data,
        ["routeNo"],
        ["asc"]
      );

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRouteList",
          busRouteList: sortedNlbBusRouteList,
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
