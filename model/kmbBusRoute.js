const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const kmbBusRouteSchema = new dynamoose.Schema(
  {
    id: String,
    route: Number,
    bound: Number,
    service_type: Number,
    orig_en: String,
    orig_tc: String,
    orig_sc: String,
    dest_en: String,
    dest_tc: String,
    dest_sc: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const kmbBusRouteModel = dynamoose.model("KmbBusRoute", kmbBusRouteSchema);

module.exports = kmbBusRouteModel;
