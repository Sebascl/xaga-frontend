import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Services from "./sections/Services";
import MisionVision from "./sections/MisionVision";
import Hero from "./sections/Hero";
import QuienesSomos from "./sections/QuienesSomos";
import NuestrosClientes from "./sections/NuestrosClientes";
import Navbar from "./components/NavBar";
import ChooseUs from "./sections/ChooseUs";
import TramitesVisa from "./sections/TramitesVisa";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <QuienesSomos />
    <ChooseUs />
    <MisionVision />
    <Services />
    <TramitesVisa />
    <NuestrosClientes />
    <Contact />
    <Footer />
  </>
);

export default App;
