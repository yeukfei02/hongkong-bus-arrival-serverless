const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { getBusStopListNlb } = require("../../../api/nlb/busStopList");

const NlbBusRoute = require("../../../model/nlbBusRoute");
const NlbBusStop = require("../../../model/nlbBusStop");

module.exports.busStopListScheduleJob = async () => {
  let response = {};

  const nlbBusStop = await NlbBusStop.scan().all().exec();
  const nlbBusStopList = nlbBusStop.toJSON();
  console.log("db nlbBusStopList.length = ", nlbBusStopList.length);

  if (nlbBusStopList) {
    for (let index = 0; index < nlbBusStopList.length; index++) {
      const nlbBusStopObj = nlbBusStopList[index];
      const { id } = nlbBusStopObj;
      await NlbBusStop.delete({ id });
    }
  }

  const nlbBusRoute = await NlbBusRoute.scan().all().exec();
  const nlbBusRouteList = nlbBusRoute.toJSON();
  console.log("db nlbBusRouteList.length = ", nlbBusRouteList.length);

  if (nlbBusRouteList) {
    for (let a = 0; a < nlbBusRouteList.length; a++) {
      const nlbBusRouteObj = nlbBusRouteList[a];
      const { routeId } = nlbBusRouteObj;

      const getBusStopListNlbResult = await getBusStopListNlb(routeId);
      if (getBusStopListNlbResult && getBusStopListNlbResult.stops) {
        const getBusStopListNlbResultList = getBusStopListNlbResult.stops;
        console.log(
          "response getBusStopListNlbResultList.length = ",
          getBusStopListNlbResultList.length
        );

        for (
          let index = 0;
          index < getBusStopListNlbResultList.length;
          index++
        ) {
          const item = getBusStopListNlbResultList[index];

          const { stopId } = item;
          const stopNameEn = item.stopName_e;
          const stopNameTc = item.stopName_c;
          const stopNameSc = item.stopName_s;
          const stopLocationEn = item.stopLocation_e;
          const stopLocationTc = item.stopLocation_c;
          const stopLocationSc = item.stopLocation_s;
          const lat = item.latitude ? parseFloat(item.latitude) : 0;
          const long = item.longitude ? parseFloat(item.longitude) : 0;
          const fare = item.fare ? parseFloat(item.fare) : 0;
          const fareHoliday = item.fareHoliday
            ? parseFloat(item.fareHoliday)
            : 0;
          const someDepartureObserveOnly = item.someDepartureObserveOnly
            ? parseFloat(item.someDepartureObserveOnly)
            : 0;

          const nlbBusStopObj = new NlbBusStop({
            id: nanoid(),
            stopId,
            stopName_en: stopNameEn,
            stopName_tc: stopNameTc,
            stopName_sc: stopNameSc,
            stopLocation_en: stopLocationEn,
            stopLocation_tc: stopLocationTc,
            stopLocation_sc: stopLocationSc,
            lat,
            long,
            fare,
            fareHoliday,
            someDepartureObserveOnly,
          });
          await nlbBusStopObj.save();
        }

        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "busStopListScheduleJob",
          }),
        };
      }
    }
  }

  return response;
};
