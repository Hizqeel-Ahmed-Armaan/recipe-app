import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state - all strings
  const [formData, setFormData] = useState({
    title: '',
    photoURL: '',
    category: '',
    cookingTime: '',
    ingredients: '',
    instructions: ''
  });

  // Fetch recipe on mount
  useEffect(() => {
    axios.get(`/api/recipes/${id}`).then(res => {
      setRecipe(res.data);
      setFormData({
        title: res.data.title,
        photoURL: res.data.photoURL,
        category: res.data.category,
        cookingTime: String(res.data.cookingTime),
        ingredients: res.data.ingredients,
        instructions: res.data.instructions
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    axios.put(`/api/recipes/${id}`, {
      ...formData,
      cookingTime: formData.cookingTime // still string, backend should handle
    }).then(() => {
      setRecipe(formData);
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/recipes/${id}`).then(() => {
      navigate('/');
    });
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {isEditing ? (
        <>
          <div>
            <label>Image URL</label>
            <input
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {formData.photoURL && (
              <img
                src={formData.photoURL}
                alt="Preview"
                className="w-full h-48 object-cover mt-2 rounded"
              />
            )}
          </div>

          <div>
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Cooking Time (minutes)</label>
            <input
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={4}
            />
          </div>

          <div>
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={6}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={recipe.photoURL}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded"
          />
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
          <h2 className="mt-4 font-semibold">Ingredients</h2>
          <p>{recipe.ingredients}</p>
          <h2 className="mt-4 font-semibold">Instructions</h2>
          <p>{recipe.instructions}</p>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;

