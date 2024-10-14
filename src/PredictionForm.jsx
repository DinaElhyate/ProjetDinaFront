import React, { useState } from 'react';
import axios from 'axios';
import './PredictionForm.css';
import { Link } from 'react-router-dom';

const PredictionForm = () => {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('dataset', file);

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:5000/train', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResults(response.data.results);
            setLoading(false);
        } catch (err) {
            setError('Error uploading file or fetching predictions.');
            setLoading(false);
            console.error(err);
        }
    };

    const handleAlgorithmSelect = (algorithm) => {
        setSelectedAlgorithm(`${algorithm}`);
    };

    return (
        <div className="container">
            <h1>Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload your dataset:
                    <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
                </label>
                <button type="submit">Predir</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results && (
                <div className='algo'>
                    <h2>Resultat de prediction</h2>
                    {Object.keys(results).map((algorithm) => (
                        <div key={algorithm} className="algorithm-results">
                            <button onClick={() => handleAlgorithmSelect(algorithm)} className="algorithm">{algorithm}</button>
                            <pre className="results">{JSON.stringify(results[algorithm], null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
            {selectedAlgorithm && (
              <a href={`./algorithm/${selectedAlgorithm}`} className="algorithm-link">
        {selectedAlgorithm}
    </a>
)}

        </div>
    );
};

export default PredictionForm;
