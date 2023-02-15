const NlbBusStop = require("../../../model/nlbBusStop");
const { getBusStopListNlb } = require("../../../api/nlb/busStopList");

module.exports.busStopList = async () => {
  console.log("### busStopList ###");

  let response = {};

  const nlbBusStop = await NlbBusStop.scan().all().exec();
  const nlbBusStopList = nlbBusStop.toJSON();

  if (nlbBusStopList) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: nlbBusStopList,
      }),
    };
  } else {
    const getBusStopListNlbResult = await getBusStopListNlb();

    if (getBusStopListNlbResult) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStopList",
          busStopList: getBusStopListNlbResult.data,
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
