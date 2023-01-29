const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");
const _ = require("lodash");

const { getBusRouteStop } = require("../../../api/nwfbOrCtb/busRouteStop");

const NwfbOrCtbBusRoute = require("../../../model/nwfbOrCtbBusRoute");
const NwfbOrCtbBusStop = require("../../../model/nwfbOrCtbBusStop");

module.exports.busStopListScheduleJob = async () => {
  let response = {};

  const nwfbOrCtbBusRoute = await NwfbOrCtbBusRoute.scan().all().exec();
  const nwfbOrCtbBusRouteList = nwfbOrCtbBusRoute.toJSON();
  console.log(
    "db nwfbOrCtbBusRouteList.length = ",
    nwfbOrCtbBusRouteList.length
  );

  if (nwfbOrCtbBusRouteList) {
    const nwfbOrCtbBusStop = await NwfbOrCtbBusStop.scan().all().exec();
    const nwfbOrCtbBusStopList = nwfbOrCtbBusStop.toJSON();
    console.log(
      "db nwfbOrCtbBusStopList.length = ",
      nwfbOrCtbBusStopList.length
    );

    if (nwfbOrCtbBusStopList) {
      for (let index = 0; index < nwfbOrCtbBusStopList.length; index++) {
        const item = nwfbOrCtbBusStopList[index];
        const { id } = item;
        await NwfbOrCtbBusStop.delete({ id });
      }
    }

    const directions = ["outbound", "inbound"];
    for (let a = 0; a < directions.length; a++) {
      const direction = directions[a];

      for (let b = 0; b < nwfbOrCtbBusRouteList.length; b++) {
        const item = nwfbOrCtbBusRouteList[b];

        const companyId = item.co;
        const routeStr = item.route;

        if (companyId && routeStr && direction) {
          const getBusRouteStopResult = await getBusRouteStop(
            companyId,
            routeStr,
            direction
          );
          console.log(
            "getBusRouteStopResult.length = ",
            getBusRouteStopResult.length
          );

          if (getBusRouteStopResult) {
            for (let c = 0; c < getBusRouteStopResult.length; c++) {
              const busRouteStop = getBusRouteStopResult[c];

              const { stop } = busRouteStop;

              const nwfbOrCtbBusStopFromDb = await NwfbOrCtbBusStop.query({
                name_en: { eq: stop.name_en },
              })
                .using("nameEnIndex")
                .all()
                .exec();
              const nwfbOrCtbBusStopObjFromDb =
                nwfbOrCtbBusStopFromDb.toJSON();

              if (_.isEmpty(nwfbOrCtbBusStopObjFromDb)) {
                const nameEn = stop.name_en;
                const nameTc = stop.name_tc;
                const nameSc = stop.name_sc;
                const lat = stop.lat ? parseFloat(stop.lat) : 0;
                const long = stop.long ? parseFloat(stop.long) : 0;

                const nwfbOrCtbBusStopObj = new NwfbOrCtbBusStop({
                  id: nanoid(),
                  stop: stop.stop,
                  name_en: nameEn,
                  name_tc: nameTc,
                  name_sc: nameSc,
                  lat,
                  long,
                });
                await nwfbOrCtbBusStopObj.save();
              }
            }
          }
        }
      }
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "busStopListScheduleJob",
      }),
    };
  }

  return response;
};
