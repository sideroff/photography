import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="parallax" style={{ backgroundImage: "url('/hero.jpg')" }}>
        <div className="title">Damyan Georgiev Photography</div>
        <div className="subtitle">
          Photography is the story I fail to put into words
        </div>
      </div>
      <div className="categories">
        {isLoading && <Loading />}

        {!isLoading &&
          categories &&
          categories.map((category) => (
            <NavLink
              to={`/category/${category.title.toLowerCase()}`}
              className="category card"
              style={{ backgroundImage: `url('${category.primaryImage}')` }}
            >
              <div className="title">{category.title}</div>
            </NavLink>
          ))}
      </div>
    </>
  );
}
