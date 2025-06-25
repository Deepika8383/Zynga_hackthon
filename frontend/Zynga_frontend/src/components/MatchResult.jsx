// import { useEffect, useState } from 'react';

// export default function MatchResult({ idImage, selfie }) {
//   const [match, setMatch] = useState(null);

//   useEffect(() => {
//     // Simulated API call to check face match
//     const timeout = setTimeout(() => {
//       // Randomly determine result
//       const isMatch = Math.random() > 0.5;
//       setMatch(isMatch);
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="text-center">
//       <h2 className="text-2xl font-bold mb-6">Step 3: Verifying Match...</h2>
//       <div className="flex justify-center gap-4 mb-6">
//         <img src={URL.createObjectURL(idImage)} alt="ID" className="w-32 rounded shadow" />
//         <img src={selfie} alt="Selfie" className="w-32 rounded shadow" />
//       </div>

//       {match === null ? (
//         <p className="text-gray-600">Processing...</p>
//       ) : match ? (
//         <p className="text-green-600 text-xl font-semibold">✅ ID and Selfie Match!</p>
//       ) : (
//         <p className="text-red-600 text-xl font-semibold">❌ Match Failed. Please try again.</p>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import axios from 'axios';
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

export default function MatchResult({ idImage, selfie }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // const matchFaces = async () => {
    //   if (!idImage || !selfie) {
    //     console.warn('⚠️ One or both images are missing');
    //     return;
    //   }
    
    //   const formData = new FormData();
    //   formData.append('aadhaar', idImage); // File from input
    //   const selfieFile = new File([dataURLtoBlob(selfie)], "selfie.jpg", { type: "image/jpeg" });
    //   formData.append('selfie', selfieFile);
    
    //   try {
    //     const res = await axios.post("http://localhost:5000/match", formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       }
    //     });
    //     setResult(res.data);
    //   } catch (err) {
    //     console.error(err);
    //     setError('Face match failed. Try again.');
    //   }
    // };
    
    const matchFaces = async () => {
      if (!idImage || !selfie) {
        console.warn('⚠️ One or both images are missing');
        return;
      }
    
      const formData = new FormData();
      formData.append('aadhaar', idImage); // File from input
    
      const selfieFile = new File([dataURLtoBlob(selfie)], "selfie.jpg", { type: "image/jpeg" });
      formData.append('selfie', selfieFile);
    
      try {
        const response = await fetch("http://localhost:3000/match", {
          method: "POST",
          body: formData
          // ⚠️ Note: No need to set 'Content-Type' for FormData, browser does it automatically
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
    
        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setError('Face match failed. Try again.');
      }
    };
    
    matchFaces();
  }, [idImage, selfie]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!result) return <p>Processing face match...</p>;

  return (
    <div>
      <h3 className="text-lg font-bold">Face Match Result</h3>
      <p>Match: {result.match ? '✅ Match' : '❌ No Match'}</p>
      <p>Confidence: {result.confidence_percent}%</p>
      {result.reason && <p>Reason: {result.reason}</p>}
    </div>
  );
}
