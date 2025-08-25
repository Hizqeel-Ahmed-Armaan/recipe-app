import express from 'express';
import connectDB from './config/db.js';    
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'
import recipesRoutes from './routes/routes.js'
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipesRoutes)

connectDB();
app.listen(3000, () => {
    console.log('Server is running properly');
});