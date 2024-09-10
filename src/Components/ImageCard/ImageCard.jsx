import React from "react";
import { useNavigate } from "react-router-dom";
import { useZustand } from "../../Zustand/UseZustand";

export const ImageCard = ({ data }) => {
    const navigate=useNavigate()
    const {setImageData}=useZustand()
  const onAddCaption = () => {
   
    navigate("/downloadImage")
    setImageData(data)
  };

  return (
    
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        alt="example"
        src={data?.url}
        className="w-80 h-48 object-cover"
      />
      <div className="p-4 flex justify-center">
        <button
          onClick={onAddCaption}
          className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Caption
        </button>
      </div>
    </div>
  );
};
