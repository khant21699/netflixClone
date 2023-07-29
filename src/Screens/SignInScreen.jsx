import React, { useRef } from "react";
import "./SignIn.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import db from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignInScreen = () => {
  const emailRef = useRef();
  const passworkRef = useRef();

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passworkRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.message);
        emailRef.current.focus();
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passworkRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        register(e);
      });
  };
  return (
    <div className="signInScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passworkRef} type="password" placeholder="Password" />
        <button type="Submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          New to Netflix? <span onClick={register}>Sign Up Now.</span>{" "}
        </h4>
      </form>
    </div>
  );
};

export default SignInScreen;
