import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const AuthenticationCodePage = () => {
  const { error } = useSelector((state) => state.user);
  const [token, setToken] = useState("");
  const [timeoutExpired, setTimeoutExprired] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, token }),
      });
      const data = await response.json();
      if (data.verified) {
        // Fetch user data after authentication is verified
        const userDataResponse = await fetch(`/api/user/${userId}`);
        const userData = await userDataResponse.json();
        // Dispatch signInSuccess to indicate successful sign-in
        dispatch(signInSuccess(userData));
        // Redirect to home page
        navigate("/");
      } else {
        dispatch(signInFailure("Invalid authentication code"));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutExprired(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeoutExpired) navigate("/sign-in");
    dispatch(signInFailure("Timeout expired"));
  }, [timeoutExpired, navigate]);

  return (
    <div className="container">
      <h2>Enter Authentication Code</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Authentication Code:</label>
        <input
          type="text"
          id="code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default AuthenticationCodePage;
