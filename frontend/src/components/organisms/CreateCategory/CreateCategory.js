import React, { useState } from "react";
import { toast } from "react-toastify";

import { Input } from "../../atoms";

export default function CreateCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [primaryImage, setPrimaryImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = (event) => {
    event.preventDefault();
    console.log("create category ", { title, description, primaryImage });
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("primaryImage", primaryImage);

    fetch("/api/category", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        toast(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error && error.message);
      });
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
            setPrimaryImage(event.target.files[0]);
          }}
        />
        <Input type="submit" value="Submit" disabled={isLoading} />
      </form>
    </div>
  );
}
