import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desert",
    "Snack"
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `/api/recipes${category && category !== "All" ? `?category=${category}` : ""}`
      );
      setRecipes(res.data);
    };
    fetchRecipes();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-300
              ${
                category === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No recipes found.</p>
        )}
        {recipes.map((recipe) => {
          console.log('photoURL:', recipe.photoURL);
          return (
            <Link
              to={`/recipes/${recipe._id}`}
              className="block border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={recipe.photoURL}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;


