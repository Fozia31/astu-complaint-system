import Category from '../models/category.model';

export const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find();

        if(categories.length === 0){
            return res.status(404).json({message:"No categories found"});
        }
        return res.status(200).json({message:"Categories retrieved successfully",data:categories});


    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const createCategory = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name){
            return res.status(400).json({message:"Name is required"});
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({message:"Category already exists"});
        }
        const category = new Category.create({
            name,
            description
        })
        await category.save();
        return res.status(201).json({
            message:"Category created successfully",
            data:category
        });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, description} = req.body;

        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }
        category,name = name || category.name;
        category.description = description || category.description;

        await category.save();

        return res.status(200).json({
            message:"Category updated successfully",
            data:category
        });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }
        await category.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Category deleted successfully",
        });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}