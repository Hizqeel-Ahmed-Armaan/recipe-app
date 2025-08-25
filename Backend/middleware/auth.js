import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const protect = async (req,res,next) => {
   let token; 

   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(500).json({message: "Error in protect function"});
    }
   }
}

export default protect;
