import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DonorRegister from './pages/DonorRegister';
import DonorLogin from './pages/DonorLogin';
import DonorDashboard from './pages/DonorDashboard';
import HospitalRegister from './pages/HospitalRegister';
import HospitalLogin from './pages/HospitalLogin';
import HospitalDashboard from './pages/HospitalDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donor/register" element={<DonorRegister />} />
            <Route path="/donor/login" element={<DonorLogin />} />
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/hospital/register" element={<HospitalRegister />} />
            <Route path="/hospital/login" element={<HospitalLogin />} />
            <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;