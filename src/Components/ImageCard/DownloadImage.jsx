import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useZustand } from "../../Zustand/UseZustand";

const DownloadImage = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const { imageData } = useZustand();

  useEffect(() => {
    const initCanvas = () => {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      fabric.Object.prototype.transparentCorners = false;

      const rect = new fabric.Rect({
        left: 100,
        top: 50,
        width: 100,
        height: 100,
        fill: 'green',
      });
      fabricCanvas.add(rect);

      const triangle = new fabric.Triangle({
        left: 300,
        top: 50,
        width: 100,
        height: 100,
        fill: 'blue',
      });
      fabricCanvas.add(triangle);

 
      const circle = new fabric.Circle({
        left: 500,
        top: 50,
        radius: 50,
        fill: 'red',
      });
      fabricCanvas.add(circle);

      const polygon = new fabric.Polygon([
        { x: 50, y: 50 },
        { x: 100, y: 50 },
        { x: 100, y: 100 },
        { x: 50, y: 100 }
      ], {
        left: 700,
        top: 50,
        fill: 'purple',
        
      });
      fabricCanvas.add(polygon);

      
      if (imageData?.url) {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; 
        img.src = imageData?.url;

        img.onload = () => {
          const fabricImage = new fabric.Image(img);
          fabricImage.set({
            left: 200,
            top: 160,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          fabricCanvas.add(fabricImage);

        
          fabricCanvas.bringToFront(fabricImage);
          fabricCanvas.renderAll();
        };

        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
      }

      
      const textbox = new fabric.Textbox('ADD Text', {
        left: 150,
        top: 350,
        fontSize: 22,
        fontFamily: 'Cambria',
        fill: '#FF0000',
        fontStyle: 'italic',
        width: 290,
        opacity: 1,
        textAlign: 'center',
        hasControls: true,
        lockScalingFlip: true,
        editable: true,
        minWidth: 50,
        minHeight: 20,
      });

      fabricCanvas.add(textbox);

      fabricCanvas.bringToFront(textbox);

      fabricCanvas.on('after:render', () => {
        fabricCanvas.contextContainer.strokeStyle = '#555';

        fabricCanvas.forEachObject(obj => {
          const bound = obj.getBoundingRect();
          fabricCanvas.contextContainer.strokeRect(
            bound.left + 0.5,
            bound.top + 0.5,
            bound.width,
            bound.height
          );
        });
      });

      setCanvas(fabricCanvas);
    };

    initCanvas();
  }, [imageData]); 

  const downloadCanvas = () => {
    if (canvas) {
    
      const scaleFactor = 2;
      const originalWidth = canvas.getWidth();
      const originalHeight = canvas.getHeight();

      const highResCanvas = document.createElement('canvas');
      highResCanvas.width = originalWidth * scaleFactor;
      highResCanvas.height = originalHeight * scaleFactor;
      const highResContext = highResCanvas.getContext('2d');

   
      highResContext.scale(scaleFactor, scaleFactor);
      highResContext.drawImage(canvas.getElement(), 0, 0);

      const dataURL = highResCanvas.toDataURL('image/png');

 
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas-image.png';

     
      document.body.appendChild(link);
      link.click();

     
      document.body.removeChild(link);
    } else {
      console.error('Canvas is not available.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Fabric.js on React - Editable and Resizable Text And Image</h1>
      <button
        onClick={downloadCanvas}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        Download Canvas
      </button>
      <div className="bg-white shadow-md p-4 w-full max-w-4xl relative">
        <canvas ref={canvasRef} width={800} height={500} className="" />
      </div>
    </div>
  );
};

export default DownloadImage;
