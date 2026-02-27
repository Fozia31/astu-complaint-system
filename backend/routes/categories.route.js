import express from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/categories', getAllCategories);

router.post('/categories', createCategory);

router.put('/categories/:id', updateCategory);

router.delete('/categories/:id', deleteCategory);


export default router;