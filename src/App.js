import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import "./App.css";

const App = () => {
  const APP_ID = "1bf9eba2";
  const APP_KEY = "96b409499a455c4424370c17e82e4760";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        // fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free

        // `)
        //   .then((x) => x.json())
        //   .then((y) => setRecipes(y.hits) + console.log(y.hits));
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free`
        );
        const data = await response.json();

        //filter out duplicates
        const uniqueRecipes = [];
        const recipeNames = new Set();

        data.hits.forEach((hit) => {
          const recipeName = hit.recipe.label;
          if (!recipeNames.has(recipeName)) {
            recipeNames.add(recipeName);
            uniqueRecipes.push(hit);
          }
        });

        setRecipes(uniqueRecipes);
        console.log(data.hits);
        console.log(uniqueRecipes);
      } catch (error) {
        console.error("an error has occured", error);
      }
    };
    //   //working version
    //   const data = await response.json();
    //   setRecipes(data.hits);
    // };
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1 className="title">Recipe Finder</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            link={recipe.recipe.shareAs}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
