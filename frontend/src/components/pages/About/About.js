import React from "react";

import "./About.scss";

//TODO: fix picture here
export default function About() {
  return (
    <div className="about-me">
      <div
        className="picture"
        style={{ backgroundImage: "url('/about-me.png')" }}
      ></div>
      <div className="text">
        <h3>The man behind the camera</h3>
      </div>
    </div>
  );
}
