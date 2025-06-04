// GetInTouchButton.jsx
import React from "react";
import handsApart from "../assets/images/hands-apart.png";
import handsTouching from "../assets/images/hands-touching.png";

const GetInTouchButton = ({ hovered }) => (
  <div className="relative w-18 h-16">
    <img
      src={handsApart}
      alt="Hands not touching"
      className="absolute inset-0 w-full h-full transition-opacity duration-300"
      style={{ opacity: hovered ? 0 : 1 }}
      draggable={false}
    />
    <img
      src={handsTouching}
      alt="Hands touching"
      className="absolute inset-0 w-full h-full transition-opacity duration-300"
      style={{ opacity: hovered ? 1 : 0 }}
      draggable={false}
    />
  </div>
);

export default GetInTouchButton;
