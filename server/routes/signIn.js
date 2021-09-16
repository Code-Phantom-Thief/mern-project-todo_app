const router = require('express').Router();
const { signIn} = require('../controllers/signInController');

router.post('/', signIn);

module.exports = router;