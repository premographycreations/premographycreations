import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./nav.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";
import Footer from "./footer.jsx";
import {
  listServiceSubfolders,
  getFolderCoverImage,
  getVideoLinks,
} from "../src/s3.js";

const PortfolioServicePage = () => {
  const { serviceName } = useParams();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFolders() {
      setLoading(true);
      const subs = await listServiceSubfolders(serviceName);

      // Attach cover image for each subfolder
      const enriched = await Promise.all(
        subs.map(async (folder) => {
          const cover = await getFolderCoverImage(serviceName, folder);
          return { name: folder, cover };
        })
      );

      setFolders(enriched);
      setLoading(false);
    }
    fetchFolders();
  }, [serviceName]);

  const handlePhotosClick = (folder) => {
    navigate(`/services/${serviceName}/${folder}/photos`);
  };

  const handleVideosClick = async (folder) => {
    const links = await getVideoLinks(serviceName, folder);
    if (links.length > 0) {
      window.open(links[0], "_blank"); // Open first link in new tab
    } else {
      alert("No video links found!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="service-page p-6">
        <h2 className="text-2xl font-bold mb-6">{serviceName} Gallery</h2>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {folders.map((folder, idx) => (
            <div key={idx} className="card shadow-lg rounded-xl overflow-hidden bg-white">
              {folder.cover ? (
                <img src={folder.cover} alt={folder.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{folder.name}</h3>
                <div className="flex space-x-3 mt-3">
                  <button
                    onClick={() => handlePhotosClick(folder.name)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Photos
                  </button>
                  <button
                    onClick={() => handleVideosClick(folder.name)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Videos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default PortfolioServicePage;
