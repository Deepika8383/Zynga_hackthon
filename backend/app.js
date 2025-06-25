const express = require('express');
const cors = require('cors');
const ocrRoutes = require('./routes/ocrRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('👋 Welcome to the Age & Identity Verification API!');
  });
app.use('/ocr', ocrRoutes);

module.exports = app;
