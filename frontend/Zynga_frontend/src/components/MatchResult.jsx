import { useEffect, useState } from 'react';

export default function MatchResult({ idImage, selfie }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    // Simulated API call to check face match
    const timeout = setTimeout(() => {
      // Randomly determine result
      const isMatch = Math.random() > 0.5;
      setMatch(isMatch);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Step 3: Verifying Match...</h2>
      <div className="flex justify-center gap-4 mb-6">
        <img src={URL.createObjectURL(idImage)} alt="ID" className="w-32 rounded shadow" />
        <img src={selfie} alt="Selfie" className="w-32 rounded shadow" />
      </div>

      {match === null ? (
        <p className="text-gray-600">Processing...</p>
      ) : match ? (
        <p className="text-green-600 text-xl font-semibold">✅ ID and Selfie Match!</p>
      ) : (
        <p className="text-red-600 text-xl font-semibold">❌ Match Failed. Please try again.</p>
      )}
    </div>
  );
}
