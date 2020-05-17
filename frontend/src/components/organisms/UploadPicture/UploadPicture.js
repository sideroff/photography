import React, { useState, useEffect } from "react";

import { Input } from "../../atoms";
import { toast } from "react-toastify";

//TODO: implement uploading a picture
export default function UploadPicture() {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [pictureFile, setPictureFile] = useState();

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/category")
      .then((response) => response.json())
      .then((response) => {
        setCategories(response.data);
        if (response && response.data && response.data.length) {
          setCategory(response.data[0]._id);
        }
        setIsLoadingCategories(false);
      })
      .catch((error) => {
        setIsLoadingCategories(false);
        toast(error && error.message);
      });
  }, []);

  const uploadPicture = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("pictureFile", pictureFile);

    fetch("/api/picture", {
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
      <h3>UploadPicture</h3>
      <form onSubmit={uploadPicture}>
        <label htmlFor="">Category:</label>
        <select
          id="categories"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          {isLoadingCategories ? (
            <option disabled value="">
              Loading...
            </option>
          ) : (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))
          )}
        </select>
        <label htmlFor="">File:</label>
        <Input
          type="file"
          name="image"
          placeholder="Image"
          onChange={(event) => {
            setPictureFile(event.target.files[0]);
          }}
        />
        <br />
        <Input type="submit" value="Submit" disabled={isLoading} />
      </form>
    </div>
  );
}
