import React from "react";

import "./Loading.scss";

export default function Loading(props) {
  return (
    <div className="loading-overlay-wrapper">
      <div class="loading-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
