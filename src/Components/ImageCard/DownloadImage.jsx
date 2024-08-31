// import React, { useEffect, useState, useRef } from 'react';
// import { useZustand } from '../../Zustand/UseZustand';
// import 'antd/dist/reset.css';
// import { Navbar } from '../Navbar/Navbar';

// const DownloadImage = () => {
//   const [caption, setCaption] = useState('');
//   const [formData, setFormData] = useState({ caption: '' });
//   const { imageData } = useZustand();

//   const canvasRef = useRef(null);
//   const [fabric, setFabric] = useState(null);
//   const [canvas, setCanvas] = useState(null);

//   useEffect(() => {
//     const loadFabricJS = () => {
//       return new Promise((resolve, reject) => {
//         if (window.fabric) {
//           resolve(window.fabric);
//         } else {
//           const script = document.createElement('script');
//           script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
//           script.onload = () => resolve(window.fabric);
//           script.onerror = reject;
//           document.body.appendChild(script);
//         }
//       });
//     };

//     loadFabricJS()
//       .then((fabric) => {
//         setFabric(fabric);

//         const canvasInstance = new fabric.Canvas(canvasRef.current, {
//           backgroundColor: '#ffffff', // Optional: add background color
//           width: 400,
//           height: 400,
//         });
//         setCanvas(canvasInstance);

//         const image = new Image();
//         image.src = `${imageData?.url}`;
//         image.crossOrigin = 'Anonymous'; // Ensure CORS for external images
//         image.onload = () => {
//           const fabricImage = new fabric.Image(image);
//           fabricImage.set({
//             left: 50,
//             top: 50,
//             scaleX: 0.5,
//             scaleY: 0.5,
//           });

//           canvasInstance.add(fabricImage);
//           canvasInstance.renderAll();
//         };
//       })
//       .catch((error) => {
//         console.error('Failed to load Fabric.js:', error);
//       });
//   }, [imageData]);
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (fabric && canvas && caption) {
//       const circle = new fabric.Circle({
//         radius: 50,
//         fill: '#f5f5f5',
//         left: Math.random() * 300, // Randomize the position for demonstration
//         top: Math.random() * 300,  // Randomize the position for demonstration
//       });

//       const captionText = new fabric.Textbox(caption, {
//         fontSize: 18,
//         fill: '#000000',
//         originX: 'center',
//         originY: 'center',
//         editable: true, // Enable editing
//       });

//       captionText.left = circle.left + circle.radius;
//       captionText.top = circle.top + circle.radius;

//       const group = new fabric.Group([circle, captionText], {
//         left: circle.left,
//         top: circle.top,
//         selectable: true, // Make the group draggable
//         evented: true, // Enable events on the group
//       });

//       canvas.add(group);
//       canvas.setActiveObject(group);
//       canvas.renderAll();

//       setCaption(''); // Clear input after adding caption
//     }
// };


//   const downloadQRCode = () => {
//     if (!canvas) return;

//     // Ensure the canvas is fully rendered before downloading
//     canvas.renderAll();

//     // Use Fabric.js to capture the canvas content
//     const dataURL = canvas.toDataURL({
//       format: 'png',
//       multiplier: 2, // Optional: for higher resolution
//     });

//     // Create a link element and trigger the download
//     const a = document.createElement('a');
//     a.download = 'canvas_image_with_caption.png';
//     a.href = dataURL;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   useEffect(() => {
//     if (canvas) {
//       // Listen for the 'object:modified' event to handle re-rendering
//       canvas.on('object:modified', () => {
//         canvas.renderAll();
//       });
//     }
//   }, [canvas]);

//   return (
//     <>
//     <Navbar/>
//     <div className="flex h-screen flex-wrap justify-center p-4 space-x-4">
//       <div className="flex-1 flex flex-col items-center p-4 border-2 rounded-xl">
//         <img
//           className="h-auto rounded-lg shadow-lg my-10 w-3/6"
//           src={imageData?.url}
//           alt="Visitor"
//         />
//       </div>
//       <div className="flex-1 flex flex-col items-center p-4 border-2 rounded-xl">
//         <div className="bg-[#d1d1cc] p-6 rounded-lg shadow-lg max-w-sm w-full h-full flex flex-col items-center justify-between">
//           <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
//             <input
//               className="px-4 py-2 border rounded-lg w-full"
//               type="text"
//               placeholder="Enter caption"
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Add Caption
//             </button>
//           </form>
//           <canvas ref={canvasRef} className="fabric-canvas" width="400" height="600" />
//           <button
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             onClick={downloadQRCode}
//           >
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default DownloadImage;
import React, { useEffect, useState, useRef } from 'react';
import { useZustand } from '../../Zustand/UseZustand';
import 'antd/dist/reset.css';

const DownloadImage = () => {
  const [caption, setCaption] = useState('');
  const [formData, setFormData] = useState({ caption: '' });
  const { imageData } = useZustand();

  const canvasRef = useRef(null);
  const [fabric, setFabric] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const loadFabricJS = () => {
      return new Promise((resolve, reject) => {
        if (window.fabric) {
          resolve(window.fabric);
        } else {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
          script.onload = () => resolve(window.fabric);
          script.onerror = reject;
          document.body.appendChild(script);
        }
      });
    };

    loadFabricJS()
      .then((fabric) => {
        setFabric(fabric);

        const canvasInstance = new fabric.Canvas(canvasRef.current, {
          backgroundColor: '#ffffff',
          width: 400,
          height: 400,
        });
        setCanvas(canvasInstance);

        const image = new Image();
        image.src = `${imageData?.url}`;
        image.crossOrigin = 'Anonymous';
        image.onload = () => {
          const fabricImage = new fabric.Image(image);
          fabricImage.set({
            left: 50,
            top: 50,
            scaleX: 0.5,
            scaleY: 0.5,
          });

          canvasInstance.add(fabricImage);
          canvasInstance.renderAll();
        };
      })
      .catch((error) => {
        console.error('Failed to load Fabric.js:', error);
      });
  }, [imageData]);

  // Add default shape and caption on canvas initialization
  useEffect(() => {
    if (fabric && canvas) {
      // Adding default shape and caption after the canvas is ready
      addShape('circle');
    }
  }, [fabric, canvas]); // Trigger when fabric and canvas are initialized

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ caption });

    if (fabric && canvas) {
      const circle = new fabric.Circle({
        radius: 50,
        fill: '#f5f5f5',
        left: 200,
        top: 300,
      });

      const captionText = new fabric.Textbox(caption, {
        fontSize: 18,
        fill: '#000000',
        originX: 'center',
        originY: 'center',
      });

      captionText.left = circle.left + circle.radius;
      captionText.top = circle.top + circle.radius;

      const group = new fabric.Group([circle, captionText], {
        left: 150,
        top: 200,
      });

      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.renderAll();
    }

    console.log('Caption submitted:', caption);
  };

  const addShape = (type) => {
    if (!fabric || !canvas) return;

    let shape;
    let captionText;

    switch (type) {
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          fill: 'white',
          left: 150,
          top: 150,
        });
        captionText = new fabric.Textbox(`${formData.caption}`, {
          fontSize: 16,
          fill: '#000000',
          left: 150,
          top: 150 + 55, // Positioning text below the shape
        });
        break;
      case 'rectangle':
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: 'blue',
          left: 200,
          top: 200,
        });
        captionText = new fabric.Textbox(`${formData.caption}`, {
          fontSize: 16,
          fill: '#000000',
          left: 200,
          top: 200 + 105,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: 'green',
          left: 250,
          top: 250,
        });
        captionText = new fabric.Textbox(`${formData.caption}`, {
          fontSize: 16,
          fill: '#000000',
          left: 250,
          top: 250 + 105,
        });
        break;
      case 'polygon':
        shape = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 50, y: 100 },
          ],
          {
            fill: 'purple',
            left: 300,
            top: 300,
          }
        );
        captionText = new fabric.Textbox('Polygon', {
          fontSize: 16,
          fill: '#000000',
          left: 300,
          top: 300 + 110,
        });
        break;
      default:
        return;
    }

    const group = new fabric.Group([shape, captionText], {
      left: shape.left,
      top: shape.top,
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  };

  const downloadQRCode = () => {
    if (!canvas) return;

    // Ensure the canvas is fully rendered before downloading
    canvas.renderAll();

    // Use Fabric.js to capture the canvas content
    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 2, // Optional: for higher resolution
    });

    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.download = 'canvas_image_with_caption.png';
    a.href = dataURL;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex h-screen flex-wrap justify-center p-4 space-x-4">
      <div className="flex-1 flex flex-col items-center p-4 border-2 rounded-xl">
        <img
          className="h-auto rounded-lg shadow-lg my-10 w-3/6"
          src={imageData?.url}
          alt="Visitor"
        />
      </div>
      <div className="flex-1 flex flex-col items-center p-4 border-2 rounded-xl">
        <div className="bg-[#d1d1cc] p-6 rounded-lg shadow-lg max-w-sm w-full h-full flex flex-col items-center justify-between">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
            <input
              className="px-4 py-2 border rounded-lg w-full"
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Caption
            </button>
          </form>
          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={() => addShape('circle')} className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Add Circle
            </button>
            <button onClick={() => addShape('rectangle')} className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add Rectangle
            </button>
            <button onClick={() => addShape('triangle')} className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Add Triangle
            </button>
            <button onClick={() => addShape('polygon')} className="px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Add Polygon
            </button>
          </div>
          <canvas ref={canvasRef} className="fabric-canvas mt-4" width="400" height="400" />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={downloadQRCode}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadImage;


