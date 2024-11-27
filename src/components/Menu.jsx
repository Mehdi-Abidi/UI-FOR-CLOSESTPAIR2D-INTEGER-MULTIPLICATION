import React from 'react';
const Menu = () => {
  const handleDownload = () => {
    const link = document.createElement('a');//anchor tab in html
    link.href = '/doc/part1.docx'; 
    link.download = 'part1.docx'; 
    link.click(); 
  };

  return (
    <div className="bg-[#1f1f1f] rounded-lg p-8 w-4/5 max-w-[700px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-center overflow-y-auto max-h-[80vh] transition-all duration-300 ease-in-out">
      <h1 className="text-2xl md:text-3xl font-bold text-[#66ccff] mb-6">Welcome to the Algorithm Menu</h1>
      <div className="space-y-4">
        <button
          onClick={handleDownload}
          className="bg-[#3f9e94] text-white py-3 px-6 rounded-lg text-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#4f9a8e] hover:scale-105 active:bg-[#357f73]"
        >
          Proceed to Part 1 - Download Document
        </button>
        <button
          onClick={() => (window.location.href = '/part2')}
          className="bg-[#3f9e94] text-white py-3 px-6 rounded-lg text-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#4f9a8e] hover:scale-105 active:bg-[#357f73]"
        >
          Proceed to Part 2 - Files For Algorithms
        </button>
        <button
          onClick={() => (window.location.href = '/part4')}
          className="bg-[#3f9e94] text-white py-3 px-6 rounded-lg text-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#4f9a8e] hover:scale-105 active:bg-[#357f73]"
        >
          Proceed to Part 4 - Visualize Algorithms
        </button>
      </div>
    </div>
  );
};

export default Menu;
