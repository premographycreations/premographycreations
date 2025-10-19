import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/nav.module.scss";

const Nav = () => {
  const [hovered, setHovered] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleMouseEnter = (menu) => setHovered(menu);
  const handleMouseLeave = () => setHovered("");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !event.target.classList.contains('hamburger')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="outer-navbox">
      <div className="logo-container">
        <img src="../assets/logo.jpg" alt="logo" onClick={() => navigate("/")} />
        <div className="hamburger" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className={`inner ${sidebarOpen ? "sidebar-open" : ""}`} ref={sidebarRef}>
        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/")}>
            <strong>Home</strong>
          </p>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/about")}>
            <strong>About</strong>
          </p>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("services")}
          onMouseLeave={handleMouseLeave}
        >
          <p>
            <strong>Services</strong>
          </p>
          <div className={`dropdown ${hovered === "services" ? "show" : ""}`}>
            <p onClick={() => navigate("/services/Engagement")}>Engagement</p>
            <p onClick={() => navigate("/services/Pre-Wedding")}>Pre-Wedding</p>
            <p onClick={() => navigate("/services/Wedding")}>
              Wedding Photography
            </p>
            <p onClick={() => navigate("/services/Post-Wedding")}>
              Post-Wedding
            </p>
            <p onClick={() => navigate("/services/Maternity")}>Maternity</p>
            <p onClick={() => navigate("/services/Rice-Ceremony")}>
              Rice-Ceremony
            </p>
          </div>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("portfolio")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/portfolio")}>
            <strong>Portfolios</strong>
          </p>
        </div>
        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("photoshoot")}
          onMouseLeave={handleMouseLeave}
        >
          <p>
            <strong>Photoshoot</strong>
          </p>
          <div className={`dropdown ${hovered === "photoshoot" ? "show" : ""}`}>
            <p onClick={() => navigate("/photoshoot/Events")}>Event</p>
            <p onClick={() => navigate("/photoshoot/Fashion")}>Fashion</p>
            <p onClick={() => navigate("/photoshoot/Fine-Arts")}>Fine Arts</p>
          </div>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("packages")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/packages")}>
            <strong>Packages</strong>
          </p>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("exhibition")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/exhibition")}>
            <strong>Exhibition</strong>
          </p>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("team")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/team")}>
            <strong>Team</strong>
          </p>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => handleMouseEnter("contact")}
          onMouseLeave={handleMouseLeave}
        >
          <p onClick={() => navigate("/contact")}>
            <strong>Contact</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
