import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'; // Import Bootstrap Button

export default function ExportButton({ type }) { // 'pdf' or 'csv'
  const getAuthToken = () => localStorage.getItem('token');

  const handleExport = async () => {
    const token = getAuthToken();
    try {
      const response = await axios.get(`http://localhost:3000/api/export/${type}`, { // Removed hardcoded URL
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses.${type}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error); // Improved error handling
      // Optionally show a user-friendly error message (e.g., using a toast or alert)
    }
  };

  return (
    <Button variant="success" onClick={handleExport}>
      Export as {type.toUpperCase()}
    </Button>
  );
}