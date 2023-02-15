const fetch = require("node-fetch");
const _ = require("lodash");
const { getNwfbOrCtbRootUrl } = require("../../helper/helper");

const rootUrl = getNwfbOrCtbRootUrl();

module.exports.getBusStopEstimateTimeArrival = async (busStopId, language) => {
  let result = [];

  try {
    const companies = ["NWFB", "CTB"];

    for (let index = 0; index < companies.length; index++) {
      const company = companies[index];

      const queryParams = new URLSearchParams({
        lang: language || "zh-hant",
      });
      const response = await fetch(
        `${rootUrl}/v1/transport/batch/stop-eta/${company}/${busStopId}?${queryParams}`
      );
      if (response) {
        const responseData = await response.json();
        console.log("responseData = ", responseData);
        if (responseData) {
          result = result.concat(responseData.data);
        }
      }
    }
  } catch (e) {
    console.log("error = ", e);
  }

  let finalResultList = [];
  if (result) {
    finalResultList = _.groupBy(result, "route");
  }

  return finalResultList;
};
