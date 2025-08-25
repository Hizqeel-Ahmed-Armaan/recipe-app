import express, { Router } from 'express';
import Recipe from '../models/recipe.js';
import protect from '../middleware/auth.js';


const router = express.Router();

//Create a Recipe
router.post('/',protect, async (req,res) => {
 const {title, ingredients, instructions, category, photoURL , cookingTime} = req.body;

 try {
    if(!title || !ingredients || !instructions || !category || !photoURL || !cookingTime){
        return res.status(400).json({message: 'Please fill all the fields'})
    }
    const recipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        category,
        photoURL,
        cookingTime
    });
    res.status(201).json(recipe);
 } catch (error) {
    res.status(500).json({message: 'Error in creating a recipe'})
 }
});

//Get recipes
router.get('/', async (req,res) => {
    const {category} = req.query;
    try {
        const query = category ? {category} : {};
        const recipes = await Recipe.find(query);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({message: 'Error finding the recipes'})
    }
});

//Get a single recipe
router.get('/:id', async (req,res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            res.status(500).json({message: 'Recipe not found'})
        }
        res.json(recipe);
    } catch (error) {
         res.status(500).json({message: 'Error finding a single recipe'})
    }
});

//Update a recipe
router.put('/:id',protect, async (req,res) => {
    const {title, ingredients, instructions, category, photoURL , cookingTime} = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id)
        if(!recipe){
            res.status(500).json({message: 'Recipe not found'})
        }

        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.category = category || recipe.category
        recipe.cookingTime = cookingTime || recipe.cookingTime
        recipe.photoURL = photoURL || recipe.photoURL;

        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (error) {
         res.status(500).json({message: 'Error updating a recipe'})
    }

})

//Delete a recipe
router.delete('/:id',protect, async (req,res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
    if(!recipe){
        res.status(500).json({message: 'Recipe not found'})
    }
    await recipe.deleteOne();
    res.json({message: 'Recipe deleted'})
    } catch (error) {
        res.status(500).json({message: "Error deleting recipe"});
    }
});


export default router;