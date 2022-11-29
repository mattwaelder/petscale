import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // const history = useNavigate();
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="form-signin m-auto text-center mt-5">
      <h3 className="mb-3 fw-normal">Register</h3>
      <div>
        <input
          type="text"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="d-grid gap-2 d-md-block mb-3">
          <button className="btn btn-primary mb-2" onClick={register}>
            Register
          </button>
          <div className="container">
            <span className="me-2">or</span>
            <button
              className="btn login__btn login__google ms-1 bg-light text-dark position-relative"
              onClick={(e) => signInWithGoogle(e)}
            >
              <FcGoogle className="h4 position-absolute top-30 start-0 ms-1" />
              <span className="ms-4">Register with Google</span>
            </button>
          </div>
        </div>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
