import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AlgorithmPage = () => {
    const { algorithm } = useParams();

    const [formData, setFormData] = useState({
        Age: '',
        Years_At_Company: '',
        Education_Level: '',
        Performance_Score: '',
        Employee_Satisfaction_Score: '',
        Remote_Work_Frequency: '',
        Sick_Days: '',
        Overtime_Hours: ''
    });

    const [predictions, setPredictions] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/predict/logistic_regression`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([formData]) // Envoyer les données sous forme de tableau avec un seul élément
            });
            const data = await response.json();
            if (response.ok) {
                setPredictions(data.predictions); // Affiche les prédictions reçues
                setError(null);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la requête.');
        }
    };

    return (
        <div>
            <h1>Algorithm: {algorithm}</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Age:</label>
                    <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Years At Company:</label>
                    <input type="number" name="Years_At_Company" value={formData.Years_At_Company} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Education Level:</label>
                    <select name="Education_Level" value={formData.Education_Level} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="0">High School</option>
                        <option value="1">Bachelor</option>
                        <option value="2">Master</option>
                        <option value="3">PhD</option>
                    </select>
                </div>
                <div>
                    <label>Performance Score:</label>
                    <input type="number" name="Performance_Score" value={formData.Performance_Score} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Employee Satisfaction Score:</label>
                    <input type="number" name="Employee_Satisfaction_Score" value={formData.Employee_Satisfaction_Score} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Remote Work Frequency:</label>
                    <input type="number" name="Remote_Work_Frequency" value={formData.Remote_Work_Frequency} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Sick Days:</label>
                    <input type="number" name="Sick_Days" value={formData.Sick_Days} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Overtime Hours:</label>
                    <input type="number" name="Overtime_Hours" value={formData.Overtime_Hours} onChange={handleInputChange} required />
                </div>

                <button type="submit">Predict</button>
            </form>

            {/* Affichage des prédictions */}
            {predictions && (
                <div>
                    <h3>Prédictions:</h3>
                    <p>{predictions.join(', ')}</p>
                </div>
            )}

            {/* Affichage des erreurs */}
            {error && (
                <div>
                    <h3>Erreur:</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default AlgorithmPage;
