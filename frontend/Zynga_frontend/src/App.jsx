import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';
import Result from './pages/Result';
// import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={
        // <ProtectedRoute>
          <Verify />
        // </ProtectedRoute>
      } />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
