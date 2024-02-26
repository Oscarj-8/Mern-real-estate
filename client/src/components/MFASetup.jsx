import { useState } from "react";

const MFASetup = () => {
  const [qrCode, setQRCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const setupMFA = async () => {
    try {
      const response = await fetch("http://localhost:3000/setup");
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
      const response = await fetch("http://localhost:3000/verify", {
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
    <div className="flex flex-col gap-2 items-center">
      <button
        className="border p-3 rounded-md bg-slate-700 text-white"
        onClick={setupMFA}
      >
        Enable MFA
      </button>
      <div className="flex flex-col items-center">
        {qrCode && <img src={qrCode} alt="QR Code" />}
        {secret && (
          <div className="flex flex-col gap-2">
            <input
              className="p-3 border text-[12px]"
              type="text"
              placeholder="Enter token from Google Authenticator"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button
              className="flex-1 bg-slate-700 text-white p-3 rounded-md hover:bg-slate-500"
              onClick={verifyToken}
            >
              Verify
            </button>
          </div>
        )}
        {verificationStatus && <p>{verificationStatus}</p>}
      </div>
    </div>
  );
};

export default MFASetup;
