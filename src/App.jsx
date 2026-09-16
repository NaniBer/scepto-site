import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SocialRail from "./components/SocialRail.jsx";
import { ContentProvider } from "./data/ContentContext.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <ContentProvider>
      <div className="bg-bg text-ink font-body min-h-screen antialiased">
        <ScrollToTop />
        <ScrollProgress />
        <Header />
        <main key={pathname} className="page-fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <SocialRail />
      </div>
    </ContentProvider>
  );
}
