const path = require('path');
const { exec } = require('child_process');

exports.compareFaces = (req, res) => {
  const idImage = path.join(__dirname, '../uploads', req.files.idImage[0].filename);
  const selfieImage = path.join(__dirname, '../uploads', req.files.selfieImage[0].filename);

  const command = `python3 ./utils/face_match.py "${idImage}" "${selfieImage}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }

    const confidence = parseFloat(stdout.trim());
    const isMatch = confidence > 0.7;

    return res.json({
      confidence: (confidence * 100).toFixed(2),
      isMatch,
    });
  });
};
