const express = require('express');
const router = express.Router();
const { addPost, gitID, UpdatePost, DeleteP, searchP, gitAll } = require('../controllers/postController');

router.use(express.json());

router.post('/add', addPost);
router.get('/affiche', gitAll);
router.get('/affiche/:id', gitID);
router.put('/update/:id', UpdatePost);
router.delete('/delete/:id', DeleteP); // DELETE route definition

router.get('/search', searchP);

module.exports = router;
