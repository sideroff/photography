import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

import "./Category.scss";
import { Loading } from "../../atoms";
import { toast } from "react-toastify";

export default function Category(params) {
  const title =
    params && params.match && params.match.params && params.match.params.title;

  const [category, setCategory] = useState();

  useEffect(() => {
    fetch(`/api/category/${title}`)
      .then((response) => response.json())
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        toast(error && error.message);
      });
  }, []);

  if (!category) return <Loading />;
  const items = category.pictures.map((pic) => ({
    original: `/${pic.name}`,
    thumbnail: `/${pic.name}`,
  }));

  return (
    <div className="category">
      <h2>{category.title}</h2>
      <ImageGallery className="gallery" items={items} />
    </div>
  );
}
