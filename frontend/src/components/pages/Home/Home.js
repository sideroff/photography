import React, { useEffect, useState } from "react";
import { Loading } from "../../atoms";

import "./Home.scss";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("here boi");
    setIsLoading(true);
    fetch("/api/category", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div
        className="parallax"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      ></div>
      <div className="categories-container">
        {isLoading && <Loading />}
        {categories &&
          categories.map((category) => (
            <div>
              <div>{category.title}</div>
              <div>{category.description}</div>
              <div>{category.primaryImage}</div>
            </div>
          ))}
      </div>
    </>
  );
}
