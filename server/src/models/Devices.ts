import { Schema, model } from "mongoose";

const DeviceSchema = new Schema(
  {
    deviceType: {
      enum: ["portatil", "escritorio", "movil", "tablet"],
      type: String, //portatil, escritorio, movil, tablet
      required: true,
    },
    brand: {
      //marca
      type: String,
      required: true,
    },
    deviceModel: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: false,
    },
    os: {
      type: String,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    observations: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
const Device = model("Device", DeviceSchema);

export default Device;
