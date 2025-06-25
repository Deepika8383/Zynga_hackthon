
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

const FaceMatchUploader = () => {
  const [response, setResponse] = useState(null);
  const webcamRef = useRef(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [selfieBlob, setSelfieBlob] = useState(null);

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        setSelfieBlob(blob);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadhaarFile || !selfieBlob) {
      alert("Please upload Aadhaar image and capture selfie");
      return;
    }

    const formData = new FormData();
    formData.append('aadhaar', aadhaarFile);
    formData.append('selfie', selfieBlob, 'selfie.jpg');

    try {
      const res = await fetch('http://localhost:5000/match', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Face Match Verification</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Aadhaar Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAadhaarFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Live Selfie Capture</label>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg shadow border border-gray-300"
            />
            <button
              type="button"
              onClick={captureSelfie}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Capture Selfie
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded text-sm text-gray-700 overflow-x-auto">
            <strong>Server Response:</strong>
            <pre className="mt-2">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceMatchUploader;
