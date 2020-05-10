import React, { useState, useEffect } from "react";

import { Input } from "../../atoms";

export default function CreateCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureFile, setPictureFile] = useState();

  const createCategory = (event) => {
    console.log(event);
  };

  return (
    <div>
      <h3>Create Category</h3>
      <form onSubmit={createCategory}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Input
          type="file"
          name="image"
          placeholder="Image"
          onChange={(event) => {
            setPictureFile(event.target.files[0]);
          }}
        />
        <Input type="submit" value="Submit" />
      </form>
    </div>
  );
}
