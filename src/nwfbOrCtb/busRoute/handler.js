const { getBusRoute } = require("../../../api/nwfbOrCtb/route");

module.exports.busRoute = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { companyId, routeStr } = event.queryStringParameters;

    if (companyId && routeStr) {
      const getBusRouteResult = await getBusRoute(companyId, routeStr);
      console.log("getBusRouteResult = ", getBusRouteResult);

      let busRouteObj = {};
      if (getBusRouteResult) {
        busRouteObj = getBusRouteResult.data;
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRoute",
          busRoute: busRouteObj,
        }),
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRoute error, no companyId and routeStr",
        }),
      };
    }
  }

  return response;
};
