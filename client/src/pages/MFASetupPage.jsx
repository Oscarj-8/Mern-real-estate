import MFASetup from "../components/MFASetup";

const MFASetupPage = () => {
  return (
    <div className="flex flex-col items-center p-3">
      <h1 className="text-center text-2xl my-7">
        Multi-factor authentication via authenticator app
      </h1>
      <MFASetup />
    </div>
  );
};
export default MFASetupPage;
