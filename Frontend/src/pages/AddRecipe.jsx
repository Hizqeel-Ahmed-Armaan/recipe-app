import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        category: "",
        photoURL: "",
        cookingTime: ""
    })

    const handleInputChange = (field, value) =>{
      setFormData((prev) => ({...prev, [field]: value}))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/recipes', {
          title: formData.title,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        category: formData.category,
        photoURL: formData.photoURL,
        cookingTime: formData.cookingTime
        })
        navigate('/');
      } catch (error) {
        console.log('Error adding a recipe')
      }
    }

  return <div className='flex justify-center items-center h-screen '>
    <div className='bg-gray-50 shadow-md border-none rounded-xl w-1/2 mt-0'>

        <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center p-5 w-full' >
            <div className='font-bold text-2xl'><h1>Add A Recipe</h1></div>

            <label className='block  text-gray-500' htmlFor="title">Title</label>
            <input required={true} className='w-full outline-none border rounded-md border-gray-500 p-1 mb-2' type="text" name='title' value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)}/>

            <label className='block text-gray-500' htmlFor="ingredients">Ingredients</label>
             <input required={true} className='mb-2 w-full outline-none border rounded-md border-gray-500 p-1' type="text" name='ingredients' value={formData.ingredients} onChange={(e) => handleInputChange("ingredients", e.target.value) } />

             <label className='block  text-gray-500' htmlFor="instructions">Instructions</label>
             <input required={true} className='mb-2 w-full outline-none border rounded-md border-gray-500 p-1' type="text" name='instructions' value={formData.instructions} onChange={(e) => handleInputChange("instructions", e.target.value) } />

             <label className='block  text-gray-500' htmlFor="category">Category</label>
             <input required={true} className='mb-2 w-full outline-none border rounded-md border-gray-500 p-1' type="text" name='category' value={formData.category} onChange={(e) => handleInputChange("category", e.target.value) } />

             <label className='block  text-gray-500' htmlFor="cookingTime">Cooking Time</label>
             <input required={true} className='mb-2 w-full outline-none border rounded-md border-gray-500 p-1' type="text" name='cookingTime' value={formData.cookingTime} onChange={(e) => handleInputChange("cookingTime", e.target.value) } />

             <label className='block  text-gray-500' htmlFor="photoURL">URL</label>
             <input required={true} className='mb-2 w-full outline-none border rounded-md border-gray-500 p-1' type="text" name='photoURL' value={formData.photoURL} onChange={(e) => handleInputChange("photoURL", e.target.value) } />

             <button type='submit' className='mb-0 mt-2 border-none rounded-md bg-blue-500 px-3 py-2 hover:bg-blue-600 active:bg-blue-700 text-white font-bold'>Add Recipe</button>
        </form>
    </div>
  </div>
  
}

export default AddRecipe
