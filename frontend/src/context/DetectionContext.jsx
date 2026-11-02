import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const DetectionContext = createContext();

export function DetectionProvider({ children }) {
  const [currentDetection, setCurrentDetection] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Load initial history from backend or localStorage
  useEffect(() => {
    async function fetchInitialHistory() {
      setIsLoadingHistory(true);
      try {
        const res = await api.getHistory();
        if (res && res.history && res.history.length > 0) {
          setHistory(res.history);
        } else {
          // Preload with high quality sample logs if empty
          const fallbackHistory = [
            {
              id: "SCAN-2026-0814",
              timestamp: "2026-10-28T09:42:00Z",
              disease_id: "leaf_blast",
              disease_name: "Leaf Blast",
              confidence: 96.8,
              severity: "High",
              area_acres: 4.5,
              variety: "Swarna (MTU 7029)",
              location: "Plot B-14, East Mandi",
              status: "Treatment Applied",
              thumbnail: "/samples/leaf_blast.jpg"
            },
            {
              id: "SCAN-2026-0813",
              timestamp: "2026-10-27T14:15:00Z",
              disease_id: "bacterial_leaf_blight",
              disease_name: "Bacterial Leaf Blight",
              confidence: 94.2,
              severity: "High",
              area_acres: 6.0,
              variety: "IR 64",
              location: "North Canal Sector",
              status: "Drainage Scheduled",
              thumbnail: "/samples/bacterial_blight.jpg"
            },
            {
              id: "SCAN-2026-0812",
              timestamp: "2026-10-25T11:30:00Z",
              disease_id: "healthy",
              disease_name: "Healthy Paddy Leaf",
              confidence: 99.1,
              severity: "None",
              area_acres: 12.0,
              variety: "PR 126",
              location: "South Green Field",
              status: "Optimal Health",
              thumbnail: "/samples/healthy.jpg"
            },
            {
              id: "SCAN-2026-0811",
              timestamp: "2026-10-23T16:05:00Z",
              disease_id: "brown_spot",
              disease_name: "Brown Spot",
              confidence: 92.4,
              severity: "Medium",
              area_acres: 3.2,
              variety: "Sona Masuri",
              location: "Upland Ridge Block",
              status: "Zinc Spray Done",
              thumbnail: "/samples/brown_spot.jpg"
            }
          ];
          setHistory(fallbackHistory);
          localStorage.setItem("paddyguard_history", JSON.stringify(fallbackHistory));
        }
      } catch (err) {
        console.error("Error loading scan history:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    }
    fetchInitialHistory();
  }, []);

  const setDetectionResult = async (result, imageSrc) => {
    const fullResult = {
      ...result,
      imageSrc,
      timestamp: new Date().toISOString()
    };
    setCurrentDetection(fullResult);

    // Save to history automatically
    if (result && result.prediction) {
      const pred = result.prediction;
      const newEntry = {
        disease_id: pred.disease_id,
        disease_name: pred.disease_name,
        confidence: pred.confidence,
        severity: pred.severity,
        variety: "Field Paddy",
        location: "Current Inspection",
        area_acres: 2.5,
        status: pred.disease_id === "healthy" ? "Healthy Crop" : "Treatment Advised",
        thumbnail: imageSrc || `/samples/${pred.disease_id}.jpg`
      };
      try {
        const saved = await api.addHistory(newEntry);
        if (saved && saved.entry) {
          setHistory(prev => [saved.entry, ...prev]);
        }
      } catch (e) {
        console.error("Failed to auto-save scan:", e);
      }
    }
  };

  const clearDetection = () => {
    setCurrentDetection(null);
  };

  return (
    <DetectionContext.Provider
      value={{
        currentDetection,
        setCurrentDetection: setDetectionResult,
        clearDetection,
        history,
        setHistory,
        isLoadingHistory
      }}
    >
      {children}
    </DetectionContext.Provider>
  );
}

export function useDetection() {
  return useContext(DetectionContext);
}
