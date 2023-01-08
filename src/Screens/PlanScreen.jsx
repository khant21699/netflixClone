import React from "react";
import "./Plan.css";

const PlanScreen = () => {
  return (
    <div className="planScreen">
      <h4>Renewal date: 04/04/2023</h4>
      <div className="planScreen__plans">
        <div className="planScreen__plan">
          <h4>Netflix Standart</h4>
          <button>Subcribe</button>
        </div>
        <div className="planScreen__plan">
          <h4>Netflix Basic</h4>
          <button>Subcribe</button>
        </div>
        <div className="planScreen__plan current__plan">
          <h4>Netflix Premium</h4>
          <button className="current">Current Package</button>
        </div>
      </div>
    </div>
  );
};

export default PlanScreen;
