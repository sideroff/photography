import React from "react";

import { CreateCategory, UploadPicture } from "../../organisms";

import "./Admin.scss";

export default function About() {
  return (
    <div className="admin">
      <CreateCategory className="form create-category" />

      <UploadPicture className="form upload-picture" />
    </div>
  );
}
