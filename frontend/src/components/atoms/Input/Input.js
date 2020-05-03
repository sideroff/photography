import React from "react";

import "./Input.scss";

export default function Input(props) {
  return (
    <div className="field">
      <input {...props} />
    </div>
  );
}
