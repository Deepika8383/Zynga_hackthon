import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('isValidUser', true);
    navigate('/verify');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to ID Verification Portal</h1>
      <button
        onClick={handleStart}
        className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
      >
        Start Verification
      </button>
    </div>
  );
}
