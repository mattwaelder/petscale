import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

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
    <div className="container">
      <form>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn-primary" onClick={register}>
          Register
        </button>
        <button
          className="btn-primary register__google"
          onClick={(e) => signInWithGoogle(e)}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </form>
    </div>

    // <div className="register">
    //   <div className="register__container">
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Full Name"
    //     />
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="register__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button className="register__btn" onClick={register}>
    //       Register
    //     </button>
    //     <button
    //       className="register__btn register__google"
    //       onClick={signInWithGoogle}
    //     >
    //       Register with Google
    //     </button>
    //     <div>
    //       Already have an account? <Link to="/">Login</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Register;
