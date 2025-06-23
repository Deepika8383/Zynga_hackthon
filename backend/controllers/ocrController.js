const tesseract = require('tesseract.js');
const path = require('path');

function formatDOB(rawDOB) {
    // Remove non-digit characters
    const digits = rawDOB.replace(/\D/g, '');
  
    if (digits.length === 8) {
      // Format as DD-MM-YYYY
      const day = digits.slice(0, 2);
      const month = digits.slice(2, 4);
      const year = digits.slice(4);
      return `${day}-${month}-${year}`;
    } else if (digits.length === 9) {
      // Try to fix malformed 9-digit DOB, assume extra digit in day or month
      const possibleDay = digits.slice(0, 2);
      const possibleMonth = digits.slice(2, 4);
      const possibleYear = digits.slice(4, 8);
      return `${possibleDay}-${possibleMonth}-${possibleYear}`;
    }
  
    return null; // Couldn’t parse
  }
  

exports.extractDOB = async (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.file.filename);
  
    try {
      const result = await tesseract.recognize(imagePath, 'eng');
      const text = result.data.text;

    //   console.log(text)
      // Normalize text for easier matching
      const cleanText = text.replace(/\s+/g, ' ').replace(/[^0-9a-zA-Z:/\-]/g, ' ');
  
      // Try common date patterns
      const dobRegexes = [
        /\b\d{2}[\/\-]\d{2}[\/\-]\d{4}\b/,  // 12/12/1968 or 12-12-1968
        /\b\d{8}\b/,                        // 12121968
        /\b\d{9}\b/,                        // 121121968 (your case)
        /\b\d{7}\b/,                        // malformed like 2121968
      ];
  
      let dob = null;
  
      for (const regex of dobRegexes) {
        const match = cleanText.match(regex);
        if (match) {
          let raw = match[0];
  
          // Fix if 7-digit (malformed like 121121968 -> guess format)
          if (raw.length === 7) {
            const likely = raw.padStart(8, '0'); // -> 0121121968
            const day = likely.slice(0, 2);
            const month = likely.slice(2, 4);
            const year = likely.slice(4);
            dob = `${day}/${month}/${year}`;
          } else if (raw.length === 8 && !raw.includes('/') && !raw.includes('-')) {
            // raw = 12121968
            const day = raw.slice(0, 2);
            const month = raw.slice(2, 4);
            const year = raw.slice(4);
            dob = `${day}/${month}/${year}`;
          } else {
            dob = raw.replace(/-/g, '/');
          }
  
          break;
        }
      }
  
      if (!dob) {
        return res.status(400).json({ message: 'DOB not found', rawText: text });
      }
      const formattedDOB = formatDOB(dob);
        return res.json({ dob: formattedDOB, rawText: text });

    //   return res.json({ dob, rawText: text });
    } catch (error) {
      return res.status(500).json({ error: 'OCR failed', details: error.message });
    }
  };
  
exports.verifyAge = (req, res) => {
  const { dob } = req.query;
  if (!dob) return res.status(400).json({ error: 'DOB is required' });

  const birthDate = new Date(dob.split('/').reverse().join('-'));
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const is18Plus = age >= 18;

  return res.json({ dob, age, is18Plus });
};
