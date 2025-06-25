
import { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

export default function Verify() {
  const navigate = useNavigate();
  const [idImage, setIdImage] = useState(null);
  const [selfieBlob, setSelfieBlob] = useState(null);
  const [dob, setDob] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [matching, setMatching] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [qualityPassed, setQualityPassed] = useState(false);
  const [qualityError, setQualityError] = useState('');
  const webcamRef = useRef(null);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleIDUpload = async (e) => {
    const file = e.target.files[0];
    setIdImage(file);
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('aadharImage', file);

    try {
      const res1 = await axios.post('http://localhost:4000/ocr/aadhar', formData);
      const rawDob = res1.data.dob;
      const formattedDob = rawDob.replace(/-/g, '/');
      setDob(formattedDob);

      const res2 = await axios.get(`http://localhost:4000/ocr/verify-age?dob=${encodeURIComponent(formattedDob)}`);
      setAgeVerified(res2.data.is18Plus);
    } catch (err) {
      setError('Error processing ID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const captureSelfie = async () => {
    setQualityError('');
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then(res => res.blob());
    setSelfieBlob(blob);
    setPhotoTaken(true);

    const formData = new FormData();
    formData.append('image', blob, 'selfie.jpg');

    try {
      const res = await axios.post('http://localhost:5000/check-quality', formData);
      if (!res.data.blurry) {
        setQualityPassed(true);
      } else {
        setQualityPassed(false);
        setQualityError('Selfie quality too low. Please retake.');
      }
    } catch (err) {
      setQualityPassed(false);
      setQualityError('Error checking image quality.');
    }
  };

  const handleRetake = () => {
    setPhotoTaken(false);
    setSelfieBlob(null);
    setQualityPassed(false);
    setQualityError('');
  };

  const handleSubmit = async () => {
    if (!idImage || !selfieBlob || !qualityPassed) {
      alert("Please upload ID, capture a high-quality selfie, and pass the quality check.");
      return;
    }

    const formData = new FormData();
    formData.append('aadhaar', idImage);
    formData.append('selfie', selfieBlob, 'selfie.jpg');

    setMatching(true);
    try {
      const res = await fetch('http://localhost:5000/match', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      const age = calculateAge(new Date(dob));
      navigate('/result', {
        state: {
          dob,
          age,
          is18Plus: age >= 18,
          matchResult: data
        }
      });
    } catch (err) {
      alert('Error during match: ' + err.message);
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-6">Identity Verification</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ID Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Upload Aadhaar Card</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleIDUpload}
              className="w-full p-2 border rounded-md"
            />
            {loading && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-blue-600">Verifying age, please wait...</p>
              </div>
            )}
            {dob && <p className="text-sm text-green-600 mt-2">DOB Extracted: {dob}</p>}
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>

          {/* Selfie */}
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Capture Selfie</h3>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-md border"
            />

            {!photoTaken ? (
              <button
                onClick={captureSelfie}
                className={`mt-3 px-4 py-2 rounded-md w-full text-white ${ageVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!ageVerified}
              >
                Click Photo
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="mt-3 px-4 py-2 rounded-md w-full text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Retake Photo
              </button>
            )}

            {qualityError && (
              <p className="text-sm text-red-600 mt-2">{qualityError}</p>
            )}
            {qualityPassed && (
              <p className="text-sm text-green-600 mt-2">Image quality check passed ✅</p>
            )}

            <button
              onClick={handleSubmit}
              className={`mt-3 px-4 py-2 rounded-md w-full text-white ${ageVerified && selfieBlob && qualityPassed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!ageVerified || !selfieBlob || !qualityPassed}
            >
              Match Face
            </button>

            {matching && (
              <div className="flex items-center gap-2 mt-3">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-green-600">Matching face, please wait...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
