import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import TreatmentPage from './pages/TreatmentPage';
import YieldPredictionPage from './pages/YieldPredictionPage';
import DiseaseLibraryPage from './pages/DiseaseLibraryPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfa] dark:bg-[#0a150e] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detect" element={<DiseaseDetectionPage />} />
          <Route path="/treatment" element={<TreatmentPage />} />
          <Route path="/yield" element={<YieldPredictionPage />} />
          <Route path="/library" element={<DiseaseLibraryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
