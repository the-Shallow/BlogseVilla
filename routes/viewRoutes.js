const express = require('express');
const viewController = require('./../Controller/viewController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.get('/signup', viewController.getsignupForm);
router.get('/login', viewController.getLoginForm);
router.get('/account', authController.protect, viewController.getAccount);

router.use(authController.isLoggedIn);

router.get('/blogs',viewController.getAllBlogs);
router.get('/',viewController.getOverview);
router.get('/blog/:slug',viewController.getBlog);
router.get('/code-form', viewController.codeForm);

module.exports = router;