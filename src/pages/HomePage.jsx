import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/styles.css';
const HomePage = () => {
  const navigate = useNavigate(); 
  return (
    <div className="container">
      <header>
        <h1>DAA FINAL PROJECT</h1>
        <h2>GROUP MEMBERS</h2>
      </header>
      <ul className="list-none text-center mt-4">
        <li>MEHDI ABIDI (22K-4480)</li>
        <li>RIDA QAZI (22K-4409)</li>
        <li>MASHAL JAWED (22K-4552)</li>
      </ul>
      <button
        onClick={() => navigate('/menu')} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
      >
        Proceed to Application
      </button>
    </div>
  );
};
export default HomePage;
