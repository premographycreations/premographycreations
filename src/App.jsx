import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.scss"

const Home = lazy(() => import("../pages/home.jsx"));
const About = lazy(() => import("../pages/about.jsx"));
// const Services = lazy(() => import("../pages/services.jsx"));
const Exhibition = lazy(() => import("../pages/exhibition.jsx"));
const Packages = lazy(() => import("../pages/packages.jsx"));
const PortfolioHome = lazy(() => import("../pages/portfoliohome.jsx"));
const PortfolioSectionView = lazy(() => import("../pages/PortfolioSectionView.jsx"));
const SubfolderView = lazy(() => import("../pages/subfolderview.jsx"));
const Contact = lazy(() => import("../pages/contact.jsx"));
const Footer = lazy(() => import("../pages/footer.jsx"));
const Team = lazy(() => import("../pages/team.jsx"));
const ServicePage = lazy(() => import("../pages/servicepage.jsx"));
const PhotoshootPage = lazy(() => import("../pages/photoshootpage.jsx"));
const PhotoGallery = lazy(() => import("../pages/PhotoGallery.jsx"));
const TermsAndConditions = lazy(() => import("../pages/termsandconditions.jsx"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exhibition" element={<Exhibition />} />
          {/* <Route path="/services" element={<Services />} /> */}
          
          <Route path="/packages" element={<Packages />} />

          {/* Portfolio routes */}
          <Route path="/portfolio" element={<PortfolioHome />} />
          <Route path="/portfolio/:section/:subfolder/:type" element={<SubfolderView />} />
          <Route path="/portfolio/:section" element={<PortfolioSectionView />} />
          <Route path="/services/:serviceName" element={<ServicePage />} />
        <Route path="/services/:serviceName/:folder/photos" element={<PhotoGallery />} />
          <Route path="/photoshoot/:categoryName" element={<PhotoshootPage />} />
<Route path="/photoshoot/:categoryName/:subfolder" element={<PhotoshootPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/termsandconditions" element={<TermsAndConditions/>} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
