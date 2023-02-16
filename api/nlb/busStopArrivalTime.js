const fetch = require("node-fetch");
const _ = require("lodash");
const { getNwfbOrCtbRootUrl } = require("../../helper/helper");

const rootUrl = getNwfbOrCtbRootUrl();

module.exports.getBusStopArrivalTimeNlb = async (stopId, language) => {
  let result = null;

  try {
    const queryParams = new URLSearchParams({
      lang: language || "zh-hant",
    });
    const response = await fetch(
      `${rootUrl}/v1/transport/batch/stop-eta/NLB/${stopId}?${queryParams}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  let finalResultList = [];
  if (result && result.data) {
    finalResultList = _.groupBy(result.data, "route");
  }

  return finalResultList;
};
