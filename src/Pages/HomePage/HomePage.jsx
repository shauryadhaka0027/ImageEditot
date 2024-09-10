import React, { useState } from "react";
import axios from "axios";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Navbar } from "../../Components/Navbar/Navbar";

const PEXELS_API_KEY =
  "F9L0yxKwCWnfPUuvSssSYjMDp3BzftLfnBE0anaCDhBqfpK2vueu77G4";

export const HomePage = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchImages = async () => {
    if (searchQuery.trim() === "") {
      setError("Search query cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: searchQuery,
          per_page: 9,
        },
      });
      setImages(response.data.photos);
    } catch (error) {
      setError("Error fetching images. Please try again.");
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Search Image</h1>
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for images"
              className="flex-1 px-4 py-2 border-none outline-none"
            />
            <button
              onClick={searchImages}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        {loading ? (
          <div className="text-blue-500">Loading...</div>
        ) : (
          <div className="w-full flex flex-wrap justify-center gap-4 mb-8">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <ImageCard data={{ url: image.src.medium }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
