import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import NavBar from "../NavBar";
import "./Profile.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import PlanScreen from "./PlanScreen";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <NavBar />
      <div className="profileScreen__body">
        <div>
          <h1>Edit Profile</h1>
          <div className="profile__info">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
            <div className="prifile__detail">
              <h2>{user.email}</h2>
              <div className="plans">
                <h3>Plans</h3>
                <PlanScreen />
                <button
                  onClick={() => {
                    signOut(auth);
                    navigate("/");
                  }}
                  className="signOut"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
