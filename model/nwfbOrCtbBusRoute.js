const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const nwfbOrCtbBusRouteSchema = new dynamoose.Schema(
  {
    id: String,
    co: String,
    route: String,
    orig_en: {
      type: String,
      index: {
        name: "origEnIndex",
        global: true,
      },
    },
    orig_tc: String,
    orig_sc: String,
    dest_en: String,
    dest_tc: String,
    dest_sc: String,
    date_timestamp: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const nwfbOrCtbBusRouteModel = dynamoose.model(
  "NwfbOrCtbBusRoute",
  nwfbOrCtbBusRouteSchema
);

module.exports = nwfbOrCtbBusRouteModel;
