const _ = require("lodash");
const NwfbOrCtbBusStop = require("../../../model/nwfbOrCtbBusStop");

module.exports.busStopList = async () => {
  console.log("### busStopList ###");

  let response = {};

  const nwfbOrCtbBusStop = await NwfbOrCtbBusStop.scan().all().exec();
  const nwfbOrCtbBusStopList = nwfbOrCtbBusStop.toJSON();

  if (nwfbOrCtbBusStopList) {
    const sortedNwfbOrCtbBusStopList = _.orderBy(
      nwfbOrCtbBusStopList,
      ["name_en"],
      ["asc"]
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: sortedNwfbOrCtbBusStopList,
      }),
    };
  }

  console.log("response = ", response);

  return response;
};
