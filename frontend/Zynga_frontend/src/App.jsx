import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={
        <ProtectedRoute>
          <Verify />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
