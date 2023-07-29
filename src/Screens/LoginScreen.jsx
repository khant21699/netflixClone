import React, { useState } from "react";
import "./Login.css";
import SignInScreen from "./SignInScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  return (
    <>
      {showScreen ? (
        <div className="loginScreen">
          <div className="loginScreen__top">
            <img
              className="loginScreen__img"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt=""
            />
            <button
              className="signin__button"
              onClick={() => {
                setSignIn(true);
              }}
            >
              Sign In
            </button>
          </div>
          <div className="loginScreen__body">
            {signIn ? (
              <SignInScreen />
            ) : (
              <>
                <h1>Unlimited films, TV programs and more.</h1>
                <h2>Watch Anywhere. Cancle Anytime</h2>
                <h3>
                  Ready to watch? Enter your email to create or restart the
                  membership.
                </h3>
                <div className="loginscreen__input">
                  <form>
                    <input type="email" placeholder="Email Address" />
                    <button
                      className="loginScreen__button"
                      onClick={() => {
                        setSignIn(true);
                      }}
                    >
                      Get Started
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="InitialPage">
          <div className="container">
            <div>
              <img
                className="alertPng"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem-important-red.svg/2048px-Emblem-important-red.svg.png"
                alt=""
              />
            </div>
            <h1>Do Not use real credentials</h1>
            <button
              className="OkButton"
              onClick={() => {
                setShowScreen(true);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginScreen;
