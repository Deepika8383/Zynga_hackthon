// done

const express = require('express');
const router = express.Router();
const multer = require('multer');
const ocrController = require('../controllers/ocrController');

// Setup multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/aadhar', upload.single('aadharImage'), ocrController.extractDOB);
router.get('/verify-age', ocrController.verifyAge);

module.exports = router;
