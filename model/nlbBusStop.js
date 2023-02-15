const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const nlbBusStopSchema = new dynamoose.Schema(
  {
    id: String,
    stopId: String,
    stopName_en: {
      type: String,
      index: {
        name: "stopNameEnIndex",
        global: true,
      },
    },
    stopName_tc: String,
    stopName_sc: String,
    stopLocation_en: String,
    stopLocation_tc: String,
    stopLocation_sc: String,
    lat: Number,
    long: Number,
    fare: Number,
    fareHoliday: Number,
    someDepartureObserveOnly: Number,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const nlbBusStopModel = dynamoose.model("NlbBusStop", nlbBusStopSchema);

module.exports = nlbBusStopModel;
