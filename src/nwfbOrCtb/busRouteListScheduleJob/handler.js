const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { getBusRouteList } = require("../../../api/nwfbOrCtb/busRouteList");

const NwfbOrCtbBusRoute = require("../../../model/nwfbOrCtbBusRoute");

module.exports.busRouteListScheduleJob = async () => {
  let response = {};

  const nwfbOrCtbBusRoute = await NwfbOrCtbBusRoute.scan().all().exec();
  const nwfbOrCtbBusRouteList = nwfbOrCtbBusRoute.toJSON();
  console.log("nwfbOrCtbBusRouteList.length = ", nwfbOrCtbBusRouteList.length);

  for (let a = 0; a < nwfbOrCtbBusRouteList.length; a++) {
    const item = nwfbOrCtbBusRouteList[a];
    const { id } = item;
    await NwfbOrCtbBusRoute.delete({ id });
  }

  const busRouteStrList = ["NWFB", "CTB"];
  for (let index = 0; index < busRouteStrList.length; index++) {
    const busRouteStr = busRouteStrList[index];

    const getBusRouteListResult = await getBusRouteList(busRouteStr);
    console.log("getBusRouteListResult = ", getBusRouteListResult);

    if (getBusRouteListResult && getBusRouteListResult.data) {
      const getBusRouteListResultList = getBusRouteListResult.data;
      console.log(
        "getBusRouteListResultList.length = ",
        getBusRouteListResultList.length
      );

      if (getBusRouteListResultList.length !== nwfbOrCtbBusRouteList.length) {
        for (let b = 0; b < getBusRouteListResultList.length; b++) {
          const item = getBusRouteListResultList[b];

          const { co } = item;
          const { route } = item;
          const origEn = item.orig_en;
          const origTc = item.orig_tc;
          const origSc = item.orig_sc;
          const destEn = item.dest_en;
          const destTc = item.dest_tc;
          const destSc = item.dest_sc;
          const dateTimestamp = item.date_timestamp;

          const nwfbOrCtbBusRouteObj = new NwfbOrCtbBusRoute({
            id: nanoid(),
            co,
            route,
            orig_en: origEn,
            orig_tc: origTc,
            orig_sc: origSc,
            dest_en: destEn,
            dest_tc: destTc,
            dest_sc: destSc,
            date_timestamp: dateTimestamp,
          });
          await nwfbOrCtbBusRouteObj.save();
        }
      }
    }
  }

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "busRouteListScheduleJob",
    }),
  };

  return response;
};
