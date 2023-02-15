const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { getBusRouteListNlb } = require("../../../api/nlb/busRouteList");

const NlbBusRoute = require("../../../model/nlbBusRoute");

module.exports.busRouteListScheduleJob = async () => {
  let response = {};

  const getBusRouteListNlbResult = await getBusRouteListNlb();
  if (getBusRouteListNlbResult && getBusRouteListNlbResult.routes) {
    const getBusRouteListNlbResultList = getBusRouteListNlbResult.routes;
    console.log(
      "response getBusRouteListNlbResultList.length = ",
      getBusRouteListNlbResultList.length
    );

    const nlbBusRoute = await NlbBusRoute.scan().all().exec();
    const nlbBusRouteList = nlbBusRoute.toJSON();
    console.log("db nlbBusRouteList.length = ", nlbBusRouteList.length);

    if (getBusRouteListNlbResultList.length !== nlbBusRouteList.length) {
      for (let index = 0; index < nlbBusRouteList.length; index++) {
        const item = nlbBusRouteList[index];
        const { id } = item;
        await NlbBusRoute.delete({ id });
      }

      for (
        let index = 0;
        index < getBusRouteListNlbResultList.length;
        index++
      ) {
        const item = getBusRouteListNlbResultList[index];

        const { routeId } = item;
        const { routeNo } = item;
        const routeNameEn = item.routeName_e;
        const routeNameTc = item.routeName_c;
        const routeNameSc = item.routeName_s;
        const { overnightRoute } = item;
        const { specialRoute } = item;

        const nlbBusRouteObj = new NlbBusRoute({
          id: nanoid(),
          routeId,
          routeNo,
          routeName_en: routeNameEn,
          routeName_tc: routeNameTc,
          routeName_sc: routeNameSc,
          overnightRoute,
          specialRoute,
        });
        await nlbBusRouteObj.save();
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
