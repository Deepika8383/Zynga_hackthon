import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <header className="text-center py-20 px-4 bg-white shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Identity Verification Made Easy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your ID, take a selfie, and verify your identity securely and quickly.
        </p>
        <button
          onClick={() => navigate('/verify')}
          className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </header>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-blue-50 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <StepCard step="1" title="Upload Your ID" icon="🪪" />
          <StepCard step="2" title="Capture Selfie" icon="🤳" />
          <StepCard step="3" title="Get Instant Result" icon="✅" />
        </div>
      </section>

      {/* Footer/About Section */}
      <footer className="mt-auto bg-white border-t py-8 px-4 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Made with ❤️ by</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Deepika', role: 'Frontend Developer' },
            { name: 'Nishu', role: 'Backend Engineer' },
            { name: 'Shruti', role: 'UI/UX Designer' },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-blue-100 p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-bold text-blue-800">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6">© {new Date().getFullYear()} ID Verification App</p>
      </footer>
    </div>
  );
}

function StepCard({ step, title, icon }) {
  return (
    <div className="bg-white rounded-lg p-6 w-72 shadow hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-1">Step {step}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
