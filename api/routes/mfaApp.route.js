import express from "express";
import speakeasy from "speakeasy";
import qr from "qrcode";
import User from "../models/user.model.js";
const router = express.Router();

router.get("/auth-app", async (req, res) => {
  try {
    const userId = req.query.userId;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.mfaQrCode || !user.mfaSecret) {
      const secret = speakeasy.generateSecret();
      qr.toDataURL(secret.otpauth_url, async (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Error generating QR code" });
        }
        user.mfaSecret = secret.base32;
        user.mfaQrCode = data;
        await user.save();
        res.json({ secret: secret.base32, qrCode: data });
      });
    } else {
      res.json({ secret: user.mfaSecret, qrCode: user.mfaQrCode });
    }
  } catch (err) {}
});

router.put("/update-mfa-status", async (req, res) => {
  try {
    const { userId, isTwoFactorAuthEnabled } = req.body;

    await User.findByIdAndUpdate(userId, { isTwoFactorAuthEnabled: true });

    res.status(200).json({ message: "MFA enabled successfully" });
  } catch (error) {
    console.error("Error enabling MFA:", error);
    res.status(500).json({ message: "Failed to enable MFA" });
  }
});

router.post("/verify", (req, res) => {
  const { secret, token } = req.body;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });
  res.json({ verified });
});

export default router;
