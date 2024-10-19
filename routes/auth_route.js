const router = require('express').Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/logout', AuthController.signOut);

module.exports = router;