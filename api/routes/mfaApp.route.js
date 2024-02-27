import express from "express";
import speakeasy from "speakeasy";
import qr from "qrcode";

const router = express.Router();

router.get("/auth-app", (req, res) => {
  const secret = speakeasy.generateSecret();
  qr.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error generating QR code" });
    } else {
      res.json({ secret: secret.base32, qrCode: data });
    }
  });
});

router.put("/update-mfa-status", async (req, res) => {
  try {
    const userId = req.user.id;

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
