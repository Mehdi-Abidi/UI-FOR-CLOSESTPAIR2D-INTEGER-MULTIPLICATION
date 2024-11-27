import React, { useState } from 'react';
import { saveAs } from 'file-saver'; 
const AlgorithmForm = () => {
  const [algorithm, setAlgorithm] = useState('Closest Pair in 2D');
  const [numPoints, setNumPoints] = useState(5);  
  const [generatedData, setGeneratedData] = useState(null);
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      let fileData;
      if (algorithm === 'Closest Pair in 2D') {
        fileData = Array.from({ length: numPoints }, () => ({//different points required for working minimum 2pairs required 
          x: Math.floor(Math.random() * 100) + 1,
          y: Math.floor(Math.random() * 100) + 1,
        }));
      } else if (algorithm === 'Integer Multiplication') {//array of objects
        fileData = Array.from({ length: 1 }, () => ({//working is only done in one pair 2*4 like
          x: Math.floor(Math.random() * 500) + 1,
          y: Math.floor(Math.random() * 500) + 1,
        }));
      }
      data.push(fileData); 
    }
    setGeneratedData(data); 
  };
  const downloadData = () => {
    if (!generatedData) return; 
    generatedData.forEach((fileData, fileIndex) => {//loop through each file
      let csvContent = "data:text/csv;charset=utf-8,";//encode format for csv
      fileData.forEach((dataPoint) => {//loop through each pair
        if (algorithm === 'Closest Pair in 2D') {
          csvContent += `${dataPoint.x},${dataPoint.y}\n`;  
        } else if (algorithm === 'Integer Multiplication') {
          csvContent += `${dataPoint.x},${dataPoint.y}\n`;  
        }
      });
      const fileName = `${algorithm}_file_${fileIndex + 1}.csv`;
      // Encodes the csvContent into a format that can be used as a file link Makes the browser treat the data as a downloadable file.
      const encodedUri = encodeURI(csvContent);
      saveAs(encodedUri, fileName);  // Trigger file download using file-saver
    });
  };
  const handleGenerateAndDownload = (e) => {
    e.preventDefault();
    generateData(); 
    setTimeout(downloadData, 500);  // Allow time for data generation before downloading
  };
  return (
    <div className="container mx-auto text-gray-200 p-8 rounded-lg shadow-lg max-w-3xl" style={{ backgroundColor: '#1f1f1f' }}>
      <h1 className="text-2xl text-teal-400 font-semibold mb-4">Generate and Download Data</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-lg">Select Algorithm:</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}//default value is closest pair in 2d on changing the value it will change the value of algorithm using event
            className="block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-2"
          >
            <option value="Closest Pair in 2D">Closest Pair in 2D</option>
            <option value="Integer Multiplication">Integer Multiplication</option>
          </select>
        </div>

        <div>
          <label className="block text-lg">Number of Points/Elements:</label>
          <input
            type="number"
            value={numPoints}
            onChange={(e) => setNumPoints(Number(e.target.value))}
            className="block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-2"
            min="1"
            max="500"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerateAndDownload}
          className="bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-white py-3 px-6 rounded-lg"
        >
          Generate and Download CSV Data
        </button>
      </form>
    </div>
  );
};
export default AlgorithmForm;
