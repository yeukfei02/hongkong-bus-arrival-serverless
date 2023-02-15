const fetch = require("node-fetch");
const { getNlbRootUrl } = require("../../helper/helper");

const rootUrl = getNlbRootUrl();

module.exports.getBusRouteListNlb = async () => {
  let result = null;

  try {
    const queryParams = new URLSearchParams({
      action: "list",
    });
    const response = await fetch(`${rootUrl}/route.php?${queryParams}`);
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log("error = ", e);
  }

  return result;
};
