import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import PrivacyPage from "./pages/PrivacyPage";
import Hero from "./sections/Hero/Hero";
import ClientWork from "./sections/ClientWork/ClientWork";
import Projects from "./sections/Projects/Projects";
import SearchBox from "./components/SearchBox/SearchBox";
import Nav from "./components/Nav/Nav";
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";
import CookieConsent from "./components/CookieConsent/CookieConsent";

import ProjectsPage from "./pages/ProjectsPage";
import LearningsPage from "./pages/LearningsPage";

import About from "./sections/About/About";

function Home() {
  return (
    <>
      <Hero />
      <ClientWork />
      <Projects />
      <About />
      
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBanner />
      <Nav />
      <SearchBox />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/learnings" element={<LearningsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;
