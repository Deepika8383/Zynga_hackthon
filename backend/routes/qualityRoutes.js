const express = require('express');
const router = express.Router();
const qualityController = require('../controllers/qualityController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // handle in-memory image upload

// POST route to assess image quality
router.post('/check', upload.single('image'), qualityController.checkImageQuality);

module.exports = router;
