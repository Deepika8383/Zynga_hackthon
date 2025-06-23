const express = require('express');
const router = express.Router();
const multer = require('multer');
const faceController = require('../controllers/faceCompareController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post(
  '/compare',
  upload.fields([
    { name: 'idImage', maxCount: 1 },
    { name: 'selfieImage', maxCount: 1 },
  ]),
  faceController.compareFaces
);

module.exports = router;
