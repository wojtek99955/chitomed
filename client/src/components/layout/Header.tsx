import { useState, useEffect } from "react";
import MobileHeader from "./Header/MobileHeader";
import DesktopHeader from "./Header/DesktopHeader";


const Header = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{windowWidth < 1000 ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default Header;
