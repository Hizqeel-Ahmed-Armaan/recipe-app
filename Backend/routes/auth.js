import express from 'express';
import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import protect from '../middleware/auth.js';

const router = express.Router();

//Register a User
router.post('/register', async (req,res) => {
    const {username, email, password} = req.body;
    try {
        if (!username || !email || !password){
            res.status(400).json({message: 'Please fill all the fields'});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message: 'User already exists, please log in'})
        }
        const user = await User.create({username, email, password});
        const token = generateToken(user._id);
        res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token
});


    } catch (error) {
        res.status(500).json({message: 'Error registering a user'
        })
    }
});

//Login
router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || !(await user.matchPassword(password))){
           return res.status(400).json({message: 'Invalid credentials'})
        }
        const token = generateToken(user._id);
        res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token
});

    
    } catch (error) {
        res.status(500).json({message: 'Error logging in'});
    }

})

//Me page
router.get('/me', protect , async (req,res) => {
    res.status(200).json(req.user);
})

//Generate jwt
const generateToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});;
}


export default router;