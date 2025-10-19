// PhotoGallery.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./nav.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";
import { listFilesByExtensions } from "../src/s3.js"; 
import Footer from "./footer.jsx";


const PhotoGallery = () => {
  const { serviceName, folder } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      try {
        const prefix = `Services/${serviceName}/${folder}/Images/`;
        const files = await listFilesByExtensions(prefix, [
          ".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif"
        ]);
        setPhotos(files);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setPhotos([]);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, [serviceName, folder]);

  return (
    <>
      <Navbar />
      <div className="photo-gallery p-6">
        <h2 className="text-2xl font-bold mb-6">
          {folder} - {serviceName} Photos
        </h2>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.slice(0,24).map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${folder}-photo-${idx}`}
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          ))}
          {photos.length === 0 && !loading && (
            <p className="col-span-full text-center text-gray-500">
              No photos available in this album.
            </p>
          )}
        </div>
      </div>
      <WhatsAppButton />
      <Footer/>
    </>
  );
};

export default PhotoGallery;
