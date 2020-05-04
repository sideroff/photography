import React from "react";

import { Input } from "../../atoms";

//TODO: implement uploading a picture
export default function UploadPicture() {
  const uploadPicture = (event) => {
    console.log(event);
  };

  return (
    <div>
      <h3>UploadPicture</h3>
      <form onsubmit={uploadPicture}>
        <Input type="text" name="name" placeholder="Name" />
        <Input type="text" name="description" placeholder="Description" />
        <Input type="file" name="primaryImage" placeholder="Primary Image" />

        <Input type="submit" value="Submit" />
      </form>
    </div>
  );
}
