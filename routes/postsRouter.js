const express = require('express'); 
const postsController = require('../controllers/postsController');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/all-posts', postsController.getPosts);
router.get('/search-post', postsController.searchPost);
router.post('/create-post', verifyToken, postsController.createPost);
router.put('/update-post', verifyToken, postsController.updatePost);
router.delete('/delete-post', verifyToken, postsController.deletePost);

module.exports = router;