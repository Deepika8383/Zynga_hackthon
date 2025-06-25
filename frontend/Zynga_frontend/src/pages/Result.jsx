import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dob, age, is18Plus, matchResult } = location.state || {};

  if (!dob || age === undefined || matchResult === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Invalid data. Please complete verification again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Verification Summary</h2>
        <ul className="text-sm space-y-2">
          <li><strong>Date of Birth:</strong> {dob}</li>
          <li><strong>Calculated Age:</strong> {age}</li>
          <li><strong>Eligible (18+):</strong> {is18Plus ? 'Yes' : 'No'}</li>
          <li><strong>Match Result:</strong> {matchResult?.match ? 'Matched' : 'Not Matched'}</li>
        </ul>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
