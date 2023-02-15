const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const nlbBusRouteSchema = new dynamoose.Schema(
  {
    id: String,
    routeId: String,
    routeNo: String,
    routeName_en: {
      type: String,
      index: {
        name: "routeNameEnIndex",
        global: true,
      },
    },
    routeName_tc: String,
    routeName_sc: String,
    overnightRoute: Number,
    specialRoute: Number,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const nlbBusRouteModel = dynamoose.model("NlbBusRoute", nlbBusRouteSchema);

module.exports = nlbBusRouteModel;
