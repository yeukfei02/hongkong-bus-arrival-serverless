const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { getBusRouteListKmb } = require("../../../api/kmb/busRouteList");

const KmbBusRoute = require("../../../model/kmbBusRoute");

module.exports.busRouteListScheduleJob = async () => {
  let response = {};

  const getBusRouteListKmbResult = await getBusRouteListKmb();
  if (getBusRouteListKmbResult && getBusRouteListKmbResult.data) {
    const getBusRouteListKmbResultList = getBusRouteListKmbResult.data;
    console.log(
      "response getBusRouteListKmbResultList.length = ",
      getBusRouteListKmbResultList.length
    );

    const kmbBusRoute = await KmbBusRoute.scan().all().exec();
    const kmbBusRouteList = kmbBusRoute.toJSON();
    console.log("db kmbBusRouteList.length = ", kmbBusRouteList.length);

    if (getBusRouteListKmbResultList.length !== kmbBusRouteList.length) {
      for (let index = 0; index < kmbBusRouteList.length; index++) {
        const item = kmbBusRouteList[index];
        const { id } = item;
        await KmbBusRoute.delete({ id });
      }

      for (
        let index = 0;
        index < getBusRouteListKmbResultList.length;
        index++
      ) {
        const item = getBusRouteListKmbResultList[index];

        const { route } = item;
        const { bound } = item;
        const serviceType = item.service_type
          ? parseInt(item.service_type, 10)
          : 0;
        const origEn = item.orig_en;
        const origTc = item.orig_tc;
        const origSc = item.orig_sc;
        const destEn = item.dest_en;
        const destTc = item.dest_tc;
        const destSc = item.dest_sc;

        const kmbBusRouteObj = new KmbBusRoute({
          id: nanoid(),
          route,
          bound,
          service_type: serviceType,
          orig_en: origEn,
          orig_tc: origTc,
          orig_sc: origSc,
          dest_en: destEn,
          dest_tc: destTc,
          dest_sc: destSc,
        });
        await kmbBusRouteObj.save();
      }
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "busRouteListScheduleJob",
      }),
    };
  }

  return response;
};
