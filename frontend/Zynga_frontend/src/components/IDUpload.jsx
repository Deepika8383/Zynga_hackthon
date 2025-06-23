import { useState } from 'react';

export default function IDUpload({ onNext }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (img && img.type.startsWith('image/')) {
      setFile(img);
      setPreview(URL.createObjectURL(img));
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleContinue = () => {
    if (!file) return alert("Please upload your ID image first.");
    onNext(file);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Step 1: Upload Your ID</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="ID Preview" className="w-64 h-auto mx-auto rounded shadow" />
        </div>
      )}
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
