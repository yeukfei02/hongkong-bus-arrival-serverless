const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { getBusStopListKmb } = require("../../../api/kmb/busStopList");

const KmbBusStop = require("../../../model/kmbBusStop");

module.exports.busStopListScheduleJob = async () => {
  let response = {};

  const getBusStopListKmbResult = await getBusStopListKmb();
  console.log("getBusStopListKmbResult = ", getBusStopListKmbResult);

  if (getBusStopListKmbResult && getBusStopListKmbResult.data) {
    const getBusStopListKmbResultList = getBusStopListKmbResult.data;
    console.log(
      "getBusStopListKmbResultList.length = ",
      getBusStopListKmbResultList.length
    );

    const kmbBusStop = await KmbBusStop.scan().all().exec();
    const kmbBusStopList = kmbBusStop.toJSON();
    console.log("kmbBusStopList.length = ", kmbBusStopList.length);

    if (getBusStopListKmbResultList.length !== kmbBusStopList.length) {
      for (let index = 0; index < kmbBusStopList.length; index++) {
        const item = kmbBusStopList[index];
        const { id } = item;
        await KmbBusStop.delete({ id });
      }

      for (let index = 0; index < getBusStopListKmbResultList.length; index++) {
        const item = getBusStopListKmbResultList[index];

        const { stop } = item;
        const nameEn = item.name_en;
        const nameTc = item.name_tc;
        const nameSc = item.name_sc;
        const lat = item.lat ? parseFloat(item.lat) : 0;
        const long = item.long ? parseFloat(item.long) : 0;

        const kmbBusStopObj = new KmbBusStop({
          id: nanoid(),
          stop,
          name_en: nameEn,
          name_tc: nameTc,
          name_sc: nameSc,
          lat,
          long,
        });
        await kmbBusStopObj.save();
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
