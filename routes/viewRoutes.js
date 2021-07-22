const express = require('express');
const viewController = require('./../Controller/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/blog/:slug', viewController.getBlog);
router.get('/code-form', viewController.codeForm);
router.get('/signup',viewController.getsignupForm)

module.exports = router;