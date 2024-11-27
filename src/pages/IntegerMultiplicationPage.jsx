import React, { useState } from 'react';
import Papa from 'papaparse';//papaparse used for parsing csv files
const IntegerMultiplicationPage = () => {
  const [file, setFile] = useState(null);//stores the uploaded csv file
  const [dataPairs, setDataPairs] = useState([]);//stores the data pairs from the csv file
  const [steps, setSteps] = useState([]);//stores the steps of the algorithm
  const [currentResult, setCurrentResult] = useState(null);//stores the current result of the algorithm
  const [inputNum1, setInputNum1] = useState('');//stores the input number 1
  const [inputNum2, setInputNum2] = useState('');//stores the input number 2
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current pair index
  // Karatsuba Multiplication Algorithm with Visualization Steps
  const karatsuba = (x, y, depth = 0) => {//depth for how many times the function is called
    if (x < 10 || y < 10) {//if x and y are less than 10 then return the product of x and y
      const result = x * y;
      setSteps((prev) => [...prev, `Multiplying ${x} * ${y} = ${result}`]);//push the steps in the array
      return result;
    }
    const n = Math.max(x.toString().length, y.toString().length);//find the maximum length of x and y
    const m = Math.floor(n / 2);//find the middle index of the length
    const high1 = Math.floor(x / Math.pow(10, m));//find the left part of the number xl
    const low1 = x % Math.pow(10, m);//find the right part of the number xr
    const high2 = Math.floor(y / Math.pow(10, m));//find the left part of the number yl
    const low2 = y % Math.pow(10, m);//find the right part of the number yr
    setSteps((prev) => [//push the steps in the array
      ...prev,
      `Step ${depth + 1}: Split ${x} into ${high1} and ${low1}`, 
      `Step ${depth + 1}: Split ${y} into ${high2} and ${low2}`,
    ]);
    const z0 = karatsuba(low1, low2, depth + 1);//first case xl*yl
    const z1 = karatsuba(low1 + high1, low2 + high2, depth + 1);//second case (xl+xr)*(yl+yr)
    const z2 = karatsuba(high1, high2, depth + 1);//third case xl*yl
    const result = z2 * Math.pow(10, 2 * m) + (z1 - z2 - z0) * Math.pow(10, m) + z0;//final step
    setSteps((prev) => [
      ...prev,
      `Step ${depth + 1}: Compute (${high1} + ${low1}) * (${high2} + ${low2}) = ${z1}`,
      `Step ${depth + 1}: Compute ${high1} * ${high2} = ${z2}`,
      `Step ${depth + 1}: Compute ${low1} * ${low2} = ${z0}`,
      `Step ${depth + 1}: Combine results: ${result}`,
    ]);
    return result;
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);//use the uploaded file
    if (file) {
      Papa.parse(file, {//used to read the csv file takes 2 arguments file and object with properties
        complete: (results) => {//it calls the function when the parsing is complete
          const parsedData = results.data.slice(); // Copy the parsed data
          const pairs = parsedData.map((row) => ({//goes through each row and converts it into an object
            num1: parseInt(row[0], 10),//frst column in the row
            num2: parseInt(row[1], 10),//second column in the row
          }));
          setDataPairs(pairs);
        },
        header: false,//no header in the csv file
        skipEmptyLines: true,//skip the empty lines
      });
    }
  };
  const handleMultiply = (num1, num2) => {
    setSteps([]); // Reset steps before each new multiplication
    const result = karatsuba(num1, num2);
    setCurrentResult(`Result: ${num1} * ${num2} = ${result}`);
  };
  const handleVisualizeMultiplication = () => {
    const num1 = parseInt(inputNum1, 10);
    const num2 = parseInt(inputNum2, 10);
    if (!isNaN(num1) && !isNaN(num2)) {
      handleMultiply(num1, num2);
    } 
    else if (dataPairs.length > 0) {
      const { num1, num2 } = dataPairs[currentIndex];//fill the values of num1 and num2 from the data pairs from the csv file and keep track of the current index
      handleMultiply(num1, num2);
    } 
    else {
      alert('Please enter numbers or upload a CSV file with pairs.');
    }
  };
  const handleNextPair = () => {
    if (currentIndex < dataPairs.length - 1) {//if the current index is less than the length of the data pairs
      setCurrentIndex(currentIndex + 1); // Move to the next pair
      const { num1, num2 } = dataPairs[currentIndex + 1]; // Get the next pair
      handleMultiply(num1, num2); // Perform multiplication for the next pair
    } 
    else {
      alert('No more pairs to process.');
    }
  };
  return (
    <div className="container mx-auto p-6 text-gray-200 rounded-lg" style={{ backgroundColor: '#1f1f1f' }}>
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-400">Integer Multiplication Visualization</h1>
      {/* File Upload */}
      <div className="mb-6">
        <label className="block mb-2">Upload CSV File:</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
        />
      </div>
      {/* Display Pairs */}
      {dataPairs.length > 0 && (//if the data pairs are greater than 0
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Data from CSV:</h2>
          <ul className="bg-gray-800 p-4 rounded-lg">
            {dataPairs.map((pair, index) => (//go through each pair and display it
              <li key={index} className="mb-2">
                Pair {index + 1}: {pair.num1} × {pair.num2}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Manual Input */}
      <div className="mb-6">
        <label className="block mb-2">Enter Number 1:</label>
        <input
          type="number"
          value={inputNum1}
          onChange={(e) => setInputNum1(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-4"
        />
        <label className="block mb-2">Enter Number 2:</label>
        <input
          type="number"
          value={inputNum2}
          onChange={(e) => setInputNum2(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-4"
        />
      </div>
      {}
      <button
        onClick={handleVisualizeMultiplication}
        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
      >
        Visualize Multiplication
      </button>
      {/* Steps Display */}
      <h2 className="text-2xl font-semibold text-teal-400 mt-6 mb-4">Steps:</h2>
      <div className="bg-gray-800 p-4 rounded-lg overflow-y-auto max-h-96">
        {steps.map((step, index) => (
          <div key={index} className="mb-2">
            {step}
          </div>
        ))}
      </div>
      {/* Final Result */}
      {currentResult && (
        <div className="mt-6 p-4 bg-teal-700 text-white rounded-lg">
          {currentResult}
        </div>
      )}
      {/* Button to Go to Next Pair */}
      {dataPairs.length > 0 && currentIndex < dataPairs.length - 1 && (
        <button
          onClick={handleNextPair}
          className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
        >
          Next Pair
        </button>
        )}
    </div>
  );
};
export default IntegerMultiplicationPage;
