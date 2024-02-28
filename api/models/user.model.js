import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  userAgent: {
    type: String,
    required: true,
  },
  screenWidth: {
    type: Number,
    required: true,
  },
  screenHeight: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isTwoFactorAuthEnabled: {
      type: Boolean,
      default: false,
    },
    mfaSecret: {
      type: String,
      default: null,
    },
    mfaQrCode: {
      type: String,
      default: null,
    },
    devices: {
      type: [deviceSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
