import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const AP_ID = process.env.REACT_APP_API_ID;
  const AP_KEY = process.env.REACT_APP_API_KEY;

  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Apple");

  useEffect(() => {
    getRecipies();
  }, [query]);

  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${AP_ID}&app_key=${AP_KEY}`
    );
    const data = await response.json();
    setRecipies(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipies.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
