import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
// import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="form-signin m-auto text-center mt-5">
      <div>
        <h3 className="mb-3 fw-normal">Sign In</h3>
        <div className="center mb-2">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          ></input>
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></input>
        </div>
        <div className="d-grid gap-2 d-md-block mb-3">
          <button
            className="btn btn-primary mb-2"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Sign In
          </button>
          <div className="container">
            <span className="me-2">or</span>
            <button
              className="btn login__btn login__google ms-1 bg-light text-dark position-relative"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="h4 position-absolute top-30 start-0 ms-1" />
              <span className="ms-4">Login with Google</span>
            </button>
          </div>
        </div>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
      <div className="position-fixed fixed-bottom align-bottom w-100 center">
        <small>
          Firebase does not provide me (the developer) with any means of
          accessing user passwords. If you have any questions, suggestions, or
          concerns, email me at mattwaelderdev@gmail.com. Thanks!
        </small>
      </div>
    </div>
  );
}
export default Login;
