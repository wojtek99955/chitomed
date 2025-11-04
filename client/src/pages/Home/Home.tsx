import Footer from "../../components/layout/Footer/Footer";
import Header from "../../components/layout/Header";
import About from "../About/About";
import Advantages from "../Advantages/Advantages";
import Brands from "../Brands/Brands";
import Chitosan from "../Chitosan/Chitosan";
import WhatWeDo from "../WhatWeDo/WhatWeDo";
import Opening from "./Opening/Opening";

const Home = () => {
  return (
    <div>
      <Header />
      <Opening />
      <About />
      <WhatWeDo />
      <Chitosan />
      <Brands />
      <Advantages />
      <Footer />
    </div>
  );
};

export default Home;
