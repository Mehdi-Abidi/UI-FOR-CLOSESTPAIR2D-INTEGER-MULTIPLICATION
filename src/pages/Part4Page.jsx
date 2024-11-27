import React from 'react';
import { useNavigate } from 'react-router-dom';
const Part4Page = () => {
  const navigate = useNavigate();
  const handleAlgorithmClick = (algorithm) => {
    if (algorithm === 'Closest Pair in 2D') {
      navigate('/closest-pair');
    } else if (algorithm === 'Integer Multiplication') {
      navigate('/integer-multiplication');
    }
  };
  return (
    <div className="bg-[#1f1f1f] rounded-lg p-8 w-11/12 max-w-xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-center overflow-y-auto max-h-[80vh] transition-all duration-300 ease-in-out">
      <h1 className="text-2xl md:text-3xl font-bold text-[#66ccff] mb-6">Visualize Algorithms</h1>

      <div className="space-y-6">
        <button
          onClick={() => handleAlgorithmClick('Closest Pair in 2D')}
          className="bg-[#3f9e94] text-white py-3 px-8 rounded-lg text-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#4f9a8e] hover:scale-105 active:bg-[#357f73]"
        >
          Visualize Closest Pair in 2D
        </button>

        <button
          onClick={() => handleAlgorithmClick('Integer Multiplication')}
          className="bg-[#3f9e94] text-white py-3 px-8 rounded-lg text-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#4f9a8e] hover:scale-105 active:bg-[#357f73]"
        >
          Visualize Integer Multiplication
        </button>
      </div>
    </div>
  );
};
export default Part4Page;
