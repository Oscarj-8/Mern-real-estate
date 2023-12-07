import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function OAuth() {
  const handleGoogleaClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);
    } catch (error) {
      console.log("Could not sign in with Google");
    }
  };

  return (
    <button
      onClick={handleGoogleaClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      Continue with google
    </button>
  );
}
