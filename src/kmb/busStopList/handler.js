const KmbBusStop = require("../../../model/kmbBusStop");
const { getBusStopListKmb } = require("../../../api/kmb/busStopList");

module.exports.busStopList = async () => {
  console.log("### busStopList ###");

  let response = {};

  const kmbBusStop = await KmbBusStop.scan().all().exec();
  const kmbBusStopList = kmbBusStop.toJSON();

  if (kmbBusStopList) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: kmbBusStopList,
      }),
    };
  } else {
    const getBusStopListKmbResult = await getBusStopListKmb();

    if (getBusStopListKmbResult) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStopList",
          busStopList: getBusStopListKmbResult.data,
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
