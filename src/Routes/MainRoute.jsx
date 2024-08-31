import React from "react";
import { Routes ,Route} from "react-router";
import { HomePage } from "../Pages/HomePage/HomePage";
import DownloadImage from "../Components/ImageCard/DownloadImage";


const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/downloadImage" element={<DownloadImage/>}  />
      </Routes>
    </>
  );
};

export default MainRoute;
