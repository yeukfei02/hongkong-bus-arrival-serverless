const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const kmbBusStopSchema = new dynamoose.Schema(
  {
    id: String,
    stop: String,
    name_en: String,
    name_tc: String,
    name_sc: String,
    lat: Number,
    long: Number,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const kmbBusStopModel = dynamoose.model("KmbBusStop", kmbBusStopSchema);

module.exports = kmbBusStopModel;
