import { useState } from "react";

const MFASetup = () => {
  const [qrCode, setQRCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const setupMFA = async () => {
    try {
      const response = await fetch("/setup");
      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }
      const data = await response.json();
      setQRCode(data.qrCode);
      setSecret(data.secret);
    } catch (error) {
      console.error("Error setting up MFA:", error);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret, token }),
      });
      if (!response.ok) {
        throw new Error("Verification failed");
      }
      const data = await response.json();
      setVerificationStatus(data.verified ? "Success" : "Failed");
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  return (
    <div>
      <button onClick={setupMFA}>Setup MFA</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
      {secret && (
        <div>
          <input
            type="text"
            placeholder="Enter token from Google Authenticator"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={verifyToken}>Verify</button>
        </div>
      )}
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
};

export default MFASetup;
