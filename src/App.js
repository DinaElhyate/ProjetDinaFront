import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PredictionForm from './PredictionForm'; // Chemin vers PredictionForm
import AlgorithmPage from './AlgorithmPage'; // Chemin vers AlgorithmPage

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PredictionForm />} />
                <Route path="/algorithm/:algorithm" element={<AlgorithmPage />} />
            </Routes>
        </Router>
    );
};

export default App;
