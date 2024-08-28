import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, link, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h3>{title}</h3>
      <img src={image} alt="" />
      <ol className={style.ingrediants}>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <a href={link}>See all info</a>
    </div>
  );
};

export default Recipe;
