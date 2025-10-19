import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listPhotoshootMedia, getVideoLinksFromS3,getPhotoshootSubFolderCoverImages } from "../src/s3.js"; // You'll define getVideoLinksFromS3 later
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";

const PhotoshootPage = () => {
  const { categoryName, subfolder } = useParams();
  const [media, setMedia] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);
  //     const result = await listPhotoshootMedia(categoryName, subfolder);

  //     // If result is array of folders (for Events main page)
  //     if (
  //       categoryName.toLowerCase() === "events" &&
  //       !subfolder &&
  //       Array.isArray(result)
  //     ) {
  //       setFolders(result);
  //       setMedia([]);
  //     } else {
  //       setMedia(result);
  //       setFolders([]);
  //     }
  //     setLoading(false);
  //   }
  //   fetchData();
  // }, [categoryName, subfolder]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await listPhotoshootMedia(categoryName, subfolder);
  
        // Case: main Events page → shows folder cards
        if (
          categoryName.toLowerCase() === "events" &&
          !subfolder &&
          Array.isArray(result)
        ) {
          // Fetch cover image for each folder from S3
          const enriched = await Promise.all(
            result.map(async (folder) => {
              const cover = await getPhotoshootSubFolderCoverImages(categoryName, folder);
              return { name: folder, cover };
            })
          );
          setFolders(enriched);
          setMedia([]);
        } else {
          setMedia(result);
          setFolders([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [categoryName, subfolder]);
  

  
  const handleOpenImages = (folder) => {
    navigate(`/photoshoot/${categoryName}/${folder}`);
  };

  const handleOpenVideo = async (folder) => {
    try {
      // This function will fetch video links from S3 (you’ll define it in s3.js)
      const videoLinks = await getVideoLinksFromS3(categoryName, folder);

      if (videoLinks && videoLinks.length > 0) {
        // Open the first video link in a new tab
        window.open(videoLinks[0], "_blank");
      } else {
        alert("No video link found for this event.");
      }
    } catch (err) {
      console.error("Error fetching video link:", err);
      alert("Failed to load video link.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="photoshoot-page">
        <h2>
          {categoryName} {subfolder ? ` - ${subfolder}` : ""} Gallery
        </h2>

        {loading && <p>Loading...</p>}

        {/* {folders.length > 0 && (
          <div className="subfolder-list">
            {folders.map((folder, idx) => (
              <div key={idx} className="subfolder-card">
                <h3>{folder}</h3>
                <div className="button-group">
                  <button onClick={() => handleOpenImages(folder)}>Images</button>
                  <button onClick={() => handleOpenVideo(folder)}>Video</button>
                </div>
              </div>
            ))}
          </div>
        )} */}

{folders.length > 0 && (
  <div className="subfolder-list">
    {folders.map((folder, idx) => (
      <div key={idx} className="subfolder-card">
        

        {/* Image Section */}
        <div className="subfolder-image">
        <img src={folder.cover || "/placeholder-image.jpg"} alt={`${folder.name} cover`} />

        </div>
        <h3>{folder.name}</h3>

        <div className="button-group">
          <button onClick={() => handleOpenImages(folder.name)}>Images</button>
          <button onClick={() => handleOpenVideo(folder.name)}>Video</button>
        </div>
      </div>
    ))}
  </div>
)}


        {/* Show Media (Images/Videos) if inside a subfolder */}
        {media.length > 0 && (
          <div className="grid">
            {media.map((url, idx) =>
              url.match(/\.(mp4|mov|m4v|avi|mkv|webm)$/i) ? (
                <video key={idx} controls>
                  <source src={url} type="video/mp4" />
                </video>
              ) : (
                <img key={idx} src={url} alt={`${categoryName}-${idx}`} />
              )
            )}
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default PhotoshootPage;
