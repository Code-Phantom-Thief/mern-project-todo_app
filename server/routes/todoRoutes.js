const router = require('express').Router();
const {
	createPost,
	getAllTodos,
	getOneTodo,
	deletePost,
	updatePost,
	patchPost,
} = require('../controllers/todoController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllTodos);
router.get('/:id', auth, getOneTodo);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, patchPost);

module.exports = router;
