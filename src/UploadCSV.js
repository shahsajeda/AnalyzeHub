import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // Handle file clean request
  const handleFileCleanRequest = async () => {
    try {
      setMessage('Cleaning file...');
      const response = await axios.get('http://127.0.0.1:5000/clean-file', {
        responseType: 'blob', // Handle file download
      });

      // Create a download URL for the cleaned file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setMessage('File cleaned successfully!');
    } catch (error) {
      setMessage('Error cleaning file!');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Clean Static CSV File (housing.csv)</h2>
      
      <button onClick={handleFileCleanRequest}>Clean and Download File</button>

      {message && <p>{message}</p>}

      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="cleaned_housing.csv">
            Download Cleaned CSV
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;
