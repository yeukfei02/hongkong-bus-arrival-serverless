// const KmbBusStop = require("../../../model/kmbBusStop");
const { getBusStopListKmb } = require("../../../api/kmb/busStopList");

module.exports.busStopList = async () => {
  let response = {};

  // const kmbBusStop = await KmbBusStop.scan().all().exec();
  // const kmbBusStopList = kmbBusStop.toJSON();
  // console.log("kmbBusStopList.length = ", kmbBusStopList.length);

  // if (kmbBusStopList) {
  //   response = {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       message: "getBusStopList",
  //       busStopList: kmbBusStopList,
  //     }),
  //   };
  // } else {
  const getBusStopListKmbResult = await getBusStopListKmb();
  console.log("getBusStopListKmbResult = ", getBusStopListKmbResult);

  if (getBusStopListKmbResult) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: getBusStopListKmbResult.data,
      }),
    };
  }
  // }

  return response;
};
