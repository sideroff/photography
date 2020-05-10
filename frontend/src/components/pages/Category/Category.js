import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

import "./Category.scss";
import { Loading } from "../../atoms";

export default function Category(params) {
  const title =
    params && params.match && params.match.params && params.match.params.title;

  const [category, setCategory] = useState();

  useEffect(() => {
    fetch(`/api/category/${title}`)
      .then((response) => response.json())
      .then((response) => {
        console.log("response ", response);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!category) return <Loading />;
  const items = category.pictures.map((pic) => ({
    original: `/${pic.name}`,
    thumbnail: `/${pic.name}`,
  }));

  console.log("items", items);

  return (
    <div className="category">
      <h2>{category.title}</h2>
      <ImageGallery className="gallery" items={items} />
    </div>
  );
}
