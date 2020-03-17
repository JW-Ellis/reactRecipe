import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const AP_ID = process.env.REACT_APP_API_ID;
  const AP_KEY = process.env.REACT_APP_API_KEY;

  const [recipies, setRecipies] = useState([]);

  useEffect(() => {
    getRecipies();
  }, []);

  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${AP_ID}&app_key=${AP_KEY}`
    );
    const data = await response.json();
    setRecipies(data.hits);
    console.log(data.hits);
  };

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text"></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipies.map(recipe => (
        <Recipe
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
