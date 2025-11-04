import Footer from "../../components/layout/Footer/Footer";
import Header from "../../components/layout/Header";
import About from "../About/About";
import Advantages from "../Advantages/Advantages";
import Brands from "../Brands/Brands";
import Chitosan from "../Chitosan/Chitosan";
import ContactMail from "../ContactMail/ContactMail";
import WhatWeDo from "../WhatWeDo/WhatWeDo";
import Opening from "./Opening/Opening";

const Home = () => {
  return (
    <div>
      <Header />
      <Opening />
      <About />
      <br />
      <br />
      <WhatWeDo />
      <br />
      <br />
      <Chitosan />
      <br />
      <br />
      <Brands />
      <br />
      <br />
      <Advantages />
      <br />
      <br />
      <ContactMail/>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
