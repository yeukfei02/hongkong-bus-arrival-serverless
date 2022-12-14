const { getBusRoute } = require("../../../api/nwfbOrCtb/route");

module.exports.busRoute = async (event) => {
  console.log("### busRoute ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { companyId, routeStr } = event.queryStringParameters;

    if (companyId && routeStr) {
      const getBusRouteResult = await getBusRoute(companyId, routeStr);

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

  console.log("response = ", response);

  return response;
};
