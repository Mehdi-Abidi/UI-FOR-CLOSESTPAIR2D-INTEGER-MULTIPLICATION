import React, { useState, useRef, useEffect } from 'react';
import  '../index.css';
const ClosestPairDivideAndConquer = () => {
  const [points, setPoints] = useState([]);
  const [closestPair, setClosestPair] = useState(null);
  const [stepByStepMode, setStepByStepMode] = useState(false);
  const canvasRef = useRef(null);
  const dist = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);//euclidean distance
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // For adding delay between steps
  const highlightMidpointLine = async (midX, ctx) => {//to create a line in the middle of the points x -coordinate
  //ctx-refers to canvas contex ,a pen to interact with canvas 
    ctx.strokeStyle = 'blue';//color of the line
    ctx.lineWidth = 1;//width of the line
    ctx.beginPath();//start drawing
    ctx.moveTo(midX, 0);//start point of the line(speciffied x coordinate and top of the y-coorinate thats why zero)
    ctx.lineTo(midX, 500);//end point of the line
    ctx.stroke();//draw the line
    if (stepByStepMode) await sleep(1000); // Pause to show the step
  };
  const highlightPair = async (pair, ctx, color = 'green') => {
    const d = dist(pair[0], pair[1]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pair[0].x, pair[0].y);
    ctx.lineTo(pair[1].x, pair[1].y);
    ctx.stroke();
    // Label the distance in the middle of the pair
    const midX = (pair[0].x + pair[1].x) / 2;
    const midY = (pair[0].y + pair[1].y) / 2;
    ctx.fillStyle = 'black';
    ctx.font = '8px Arial';
    ctx.fillText(`Distance: ${d.toFixed(2)}`, midX + 5, midY - 5); 
    if (stepByStepMode) await sleep(1000); // Pause to show the step
  };
  const closestPairUtil = async (px, py, ctx) => {
    const n = px.length;
    //console.log("Points sorted by x:", px);
    //console.log("Points sorted by y:", py);
    // Base case: If there are below 3 points, use brute-force method
    if (n <= 3) {
      let minDist = Infinity;
      let pair = null;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const d = dist(px[i], px[j]);
          if (d < minDist) {
            minDist = d;
            pair = [px[i], px[j]];
          }
        }
      }
      await highlightPair(pair, ctx);
      return pair;
    }
    // Find midpoint and draw the midpoint line
    const mid = Math.floor(n / 2);
    const midPoint = px[mid];
    await highlightMidpointLine(midPoint.x, ctx);
    // Divide points in left and right using midpoint
    const pyl = py.filter(point => point.x <= midPoint.x);//points on the left side of the midpoint
    const pyr = py.filter(point => point.x > midPoint.x);//points on the right side of the midpoint
    const pairLeft = await closestPairUtil(px.slice(0, mid), pyl, ctx);//0--mid-1
    const pairRight = await closestPairUtil(px.slice(mid), pyr, ctx);//mid--n-1
    // Find the minimum distance between both sides
    let d = Math.min(dist(pairLeft[0], pairLeft[1]), dist(pairRight[0], pairRight[1]));
    let closestPair = dist(pairLeft[0], pairLeft[1]) < dist(pairRight[0], pairRight[1]) ? pairLeft : pairRight;
    // Create a strip of points within distance d of the midpoint line
    const strip = [];
    for (let i = 0; i < py.length; i++) {
      if (Math.abs(py[i].x - midPoint.x) < d) {
        strip.push(py[i]);
      }
    }
    await highlightStrip(strip, ctx);
    // Check the strip for closer points using the greedy approach
    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < d; j++) { // Check only points within d distance
        const distance = dist(strip[i], strip[j]);
        if (distance < d) {//if the distance is less than the minimum distance
          d = distance;
          closestPair = [strip[i], strip[j]];//update the closest pair
          await highlightPair(closestPair, ctx, 'red');//highlight the closest pair
        }
      }
    }
    return closestPair;
  };
  const highlightStrip = async (strip, ctx) => {
    ctx.strokeStyle = 'orange';//points in the strip marked as orange
    ctx.lineWidth = 1;
    for (let i = 0; i < strip.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(strip[i].x, strip[i].y);
      ctx.lineTo(strip[i + 1].x, strip[i + 1].y);
      ctx.stroke();
    }
    if (stepByStepMode) await sleep(1000); // Pause to show the step
  };
  const findClosestPair = async (points, stepByStep = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');//2d graphics
    // Sort points by x and y coordinates
    const px = points.slice().sort((a, b) => a.x - b.x);//sort the points by x-coordinate
    const py = points.slice().sort((a, b) => a.y - b.y);//sort the points by y-coordinate
    const pair = await closestPairUtil(px, py, ctx);
    setClosestPair(pair);//set the closest pair
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw the points and their coordinates only once
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw points circle 360deg
      ctx.fillStyle = 'black';
      ctx.fill();
      // Label the coordinates of each point
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText(`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, point.x + 5, point.y - 5); 
    });
    // If closest pair found, display the distance only
    if (closestPair) {
      const d = dist(closestPair[0], closestPair[1]);
      const midX = (closestPair[0].x + closestPair[1].x) / 2;
      const midY = (closestPair[0].y + closestPair[1].y) / 2;
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText(`Distance: ${d.toFixed(1)}`, midX + 5, midY - 5); // Distance label only
      // Highlight the closest pair with a line
      ctx.strokeStyle = 'red'; // Closest pair line color
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(closestPair[0].x, closestPair[0].y);
      ctx.lineTo(closestPair[1].x, closestPair[1].y);
      ctx.stroke();
    }
  }, [points, closestPair]);//whenever points or closest pair changes the canvas will be updated
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();//get the size of the canvas
    const x = event.clientX - rect.left;//x-coordinate of the point in the canvas sub due to we get the main canvas nit whole browser
    const y = event.clientY - rect.top;
    setPoints(prevPoints => [...prevPoints, { x, y }]);//add the point to the points array
  };
  const handleFindClosestPair = () => {
    if (points.length >= 2) {
      findClosestPair(points, stepByStepMode);
    }
  };
  const resetCanvas = () => {
    setPoints([]);
    setClosestPair(null);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];//get the file from the event
    if (!file) return;
    const reader = new FileReader();//predef function to read the file
    reader.onload = (e) => {//when the file is loaded 
      const text = e.target.result;//get the text from the file
      const points = parsePoints(text);//convert the text to points
      setPoints(points);
    };
    reader.readAsText(file);//read the file as text
  };
  const parsePoints = (text) => {
    const lines = text.trim().split('\n');
    const points = [];
    const usedPoints = new Set();//to avoid duplicate points
    lines.forEach(line => {
      const [x, y] = line.split(',').map(coord => parseFloat(coord.trim()));//split the line by comma and convert to float
      if (x >= 1 && x <= 100 && y >= 1 && y <= 100) {//check if the points are within the canvas
        const pointKey = `${x},${y}`;
        if (!usedPoints.has(pointKey)) {
          usedPoints.add(pointKey);
          points.push({ x, y });
        }
      }
    });
    return points;
  };
  return (
    <div className="flex flex-col items-center p-5  rounded-lg shadow-lg "style={{ backgroundColor: '#1f1f1f' }}>
      <h2 className="text-xl font-bold text-white mb-4">Closest Pair of Points - Divide and Conquer</h2>
      <input 
        type="file" 
        onChange={handleFileUpload} 
        className="mb-4 p-2 bg-gray-300 text-black rounded"
      />
        <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-gray-700 shadow-lg rounded-lg cursor-pointer"
        onClick={handleCanvasClick}
      />
      <div className="mt-6 space-x-4 flex items-center">
        <button
          onClick={handleFindClosestPair}
          disabled={points.length < 2}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md font-semibold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
        >
          Find Closest Pair
        </button>
        <button
          onClick={resetCanvas}
          className="px-5 py-3 bg-red-600 text-white rounded-lg shadow-md font-semibold hover:bg-red-700 transition-all"
        >
          Reset
        </button>
        <label className="flex items-center text-gray-200 text-sm ml-4">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-400 transition-all"
            checked={stepByStepMode}
            onChange={() => setStepByStepMode(!stepByStepMode)}
          />
          Step-by-Step Mode
        </label>
      </div>
      {closestPair && (
        <p className="mt-4 text-white">Closest Pair: ({closestPair[0].x}, {closestPair[0].y}) and ({closestPair[1].x}, {closestPair[1].y})</p>
      )}
    </div>
  );
};
export default ClosestPairDivideAndConquer;
