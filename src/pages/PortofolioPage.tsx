import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import About from "~/components/About";
import AnimatedBackground from "~/components/Background";
import ContactPage from "~/components/Contact";
import Footer from "~/components/Footer";
import Home from "~/components/Home";
import Navbar from "~/components/Navbar";
import Portofolio from "~/components/Portofolio";
import WelcomeScreen from "~/components/WelcomeScreen";

const PortofolioPage = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    Home: null,
    About: null,
    Portofolio: null,
    Contact: null,
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
      {!showWelcome && (
        <>
          <Navbar sectionRefs={sectionRefs} />
          <AnimatedBackground />
          <Home innerRef={(el) => (sectionRefs.current["Home"] = el)} />
          <About innerRef={(el) => (sectionRefs.current["About"] = el)} />
          <Portofolio
            innerRef={(el) => (sectionRefs.current["Portofolio"] = el)}
          />
          <ContactPage
            innerRef={(el) => (sectionRefs.current["Contact"] = el)}
          />
          <Footer />
        </>
      )}
    </>
  );
};

export default PortofolioPage;
