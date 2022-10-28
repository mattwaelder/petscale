import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        ></input>
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Submit
      </button>
      <button className="login__btn login__google" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </form>

    // <div className="login">
    //   <div className="login__container">
    //     <input
    //       type="text"
    //       className="login__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="login__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button
    //       className="login__btn"
    //       onClick={() => logInWithEmailAndPassword(email, password)}
    //     >
    //       Login
    //     </button>
    //     <button className="login__btn login__google" onClick={signInWithGoogle}>
    //       Login with Google
    //     </button>
    //     <div>
    //       <Link to="/reset">Forgot Password</Link>
    //     </div>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Login;
