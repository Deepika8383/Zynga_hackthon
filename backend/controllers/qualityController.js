// const cv = require('opencv4nodejs');

// exports.checkImageQuality = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image provided' });
//     }

//     // Read buffer as OpenCV Mat
//     const img = cv.imdecode(req.file.buffer);

//     // 1. Check blurriness using Laplacian variance
//     const gray = img.bgrToGray();
//     const laplacian = gray.laplacian(cv.CV_64F);
//     const variance = laplacian.meanStdDev().stddev.at(0); // get std dev of Laplacian

//     const blurThreshold = 100; // lower = more blurry
//     const isBlurry = variance < blurThreshold;

//     // 2. Check brightness
//     const meanBrightness = gray.mean().w;
//     const isDark = meanBrightness < 60;
//     const isTooBright = meanBrightness > 200;

//     // 3. Confidence score (basic heuristic)
//     let score = 100;
//     if (isBlurry) score -= 40;
//     if (isDark || isTooBright) score -= 30;

//     // Clamp score
//     score = Math.max(0, Math.min(100, Math.round(score)));

//     return res.json({
//       blurry: isBlurry,
//       lighting: isDark ? 'dark' : isTooBright ? 'too bright' : 'good',
//       confidenceScore: score,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Image quality check failed', error: err.message });
//   }
// };
