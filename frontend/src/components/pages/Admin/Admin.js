import React from "react";

import { CreateCategory, UploadPicture } from "../../organisms";

import "./Admin.scss";
import { useEffect } from "react";
import { useState } from "react";
import logger from "redux-logger";

export default function About() {
  return (
    <div className="admin">
      <CreateCategory className="form create-category" />

      <UploadPicture className="form upload-picture" />
    </div>
  );
}
