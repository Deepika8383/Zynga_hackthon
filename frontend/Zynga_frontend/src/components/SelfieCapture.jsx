// import { useRef, useState, useCallback } from 'react';
// import Webcam from 'react-webcam';

// const videoConstraints = {
//   width: 300,
//   facingMode: "user",
// };

// export default function SelfieCapture({ onNext }) {
//   const webcamRef = useRef(null);
//   const [selfie, setSelfie] = useState(null);

//   const capture = useCallback(() => {
//     const imgSrc = webcamRef.current.getScreenshot();
//     setSelfie(imgSrc);
//   }, [webcamRef]);

//   const handleContinue = () => {
//     if (!selfie) return alert("Please take a selfie first.");
//     onNext(selfie);
//   };

//   return (
//     <div className="text-center">
//       <h2 className="text-2xl font-bold mb-4">Step 2: Take a Selfie</h2>

//       {!selfie ? (
//         <div className="flex flex-col items-center gap-4">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="rounded shadow"
//           />
//           <button
//             onClick={capture}
//             className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//           >
//             Capture Selfie
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           <img src={selfie} alt="Captured Selfie" className="w-64 h-auto rounded shadow" />
//           <button
//             onClick={handleContinue}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           >
//             Continue
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from 'react';

export default function SelfieUpload({ onNext }) {
  const [selfie, setSelfie] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setSelfie(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleContinue = () => {
    if (!selfie) return alert("Please upload a selfie first.");
    onNext(selfie);
  };

  const handleRemove = () => {
    setSelfie(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Step 2: Upload a Selfie</h2>

      {!selfie ? (
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img src={selfie} alt="Uploaded Selfie" className="w-64 h-auto rounded shadow" />
          <div className="flex gap-4">
            <button
              onClick={handleContinue}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Continue
            </button>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
