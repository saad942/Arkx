const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getProductById, createProduct, updateProduct, deleteProduct,searchForProduct,getProduct } = require("../controllers/postController");
const dataUser = require("../dataUser.json");

// Login route
router.post('/login', (req, res) => {
    const { name, password } = req.body;
    
    // Find user in database
    const user = dataUser.find(u => u.name === name && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send token as response
    res.json({ token });
});

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Unauthorized
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = data;
        next();
    });
};
router.get("/products",getProduct);
router.get("/products/:id",  getProductById);
router.post("/products",verifyToken,  createProduct);
router.put("/products/:id",  updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products",searchForProduct)

module.exports = router;
