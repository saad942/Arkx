const Product = require('../models/models');
const fs=require('fs');
const products = require("../post.json");

function saveData(){
    const js_str = JSON.stringify(products, null , 2)
    fs.writeFileSync("./post.json", js_str)
}
const searchForProduct = async (req, res) => {
    try {
        const min = req.query.minPrice;
        const max = req.query.maxPrice;
        const products = await Product.find({ price: { $gte: min, $lte: max } });
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send('No products found within the specified price range');
        }
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).send('Error searching for products');
    }
};


const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.find({id:id});
        if (product) {
            res.send(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).send('Error retrieving product');
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        saveData();
        res.send(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, description } = req.body;
        const updatedProduct = await Product.findOneAndUpdate({id:id}, {$set:{ name, price, description }}, { new: true });
        if (updatedProduct) {
            res.send(updatedProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findOneAndDelete({id:id});
        if (deletedProduct) {
            res.send('Product deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
};

const getProduct=async(req,res)=>{
    const product= await Product.find()
    if(product){
       res.send(product) 
    }else{
        res.status(404).send('Product not found');

    }
    

};

module.exports = { getProductById, createProduct, updateProduct, deleteProduct,searchForProduct,getProduct };
