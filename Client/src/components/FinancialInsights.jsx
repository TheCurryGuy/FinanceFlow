import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, Button as BootstrapButton, Spinner, Alert } from 'react-bootstrap'; // Import Bootstrap components
import ReactMarkdown from 'react-markdown';

export default function FinancialInsights() {
    const [insights, setInsights] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Add error state
    const expenses = useSelector(state => state.expense.expenses);
    const getAuthToken = () => localStorage.getItem('token');


    const generateInsights = async () => {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        const token = getAuthToken();
        try {
            const { data } = await axios.post('http://localhost:3000/api/ai/insights', { expenses }, { 
                headers: { Authorization: `Bearer ${token}` }
            });
            setInsights(data.insights);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate insights.'); // Store the error message
            console.error("Error generating insights:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card bg="dark" text="white" className="border border-white">
            <Card.Body>
                <Card.Title as="h2">AI Financial Insights</Card.Title>
                <BootstrapButton variant="primary" onClick={generateInsights} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                            Generating...
                        </>
                    ) : (
                        'Get AI Insights'
                    )}
                </BootstrapButton>

                {/* Display error message */}
                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}

                {/* Display insights (only if not loading and no error) */}
                {!isLoading && !error && insights && (
                     <Card.Text className="mt-3">
                        <ReactMarkdown>{insights}</ReactMarkdown>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}