import React from "react";
import "./clanBar.css";

const ClanBar = ({ logo, color, points, maxPoints }) => {
  console.log(points, maxPoints);
  const height = 10 + (points / maxPoints) * 70;
  return (
    <div className="chefBarContainer clan">
      <div
        style={{
          width: "100px",
          height: String(height) + "vh",
          backgroundColor: color,
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
        }}
      />
      <img
        src={logo}
        alt={"Logo de " + color}
        className="chefLogoBar"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ClanBar;
