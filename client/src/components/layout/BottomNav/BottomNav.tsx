import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // dodano useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { useAuthData } from "../../../features/auth/hooks/useAuthData";
import { useLanguage } from "../../../features/language/useLanguage";
import { languages } from "./languages";
import * as S from "./Styles";

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // do obsługi przełączania
  const currentPath = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const isIsoMode = currentPath.startsWith("/iso");

  const { role } = useAuthData();
  const isAdmin = role === "admin";
  const lang = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < lastScrollY.current) {
            setIsOpen(true);
          } else if (currentScrollY > lastScrollY.current) {
            setIsOpen(false);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Funkcja przełączająca widoki
  const handleToggleMode = () => {
    if (isIsoMode) {
      navigate("/dashboard");
    } else {
      navigate("/iso/orders");
    }
  };

  return (
    <S.Container
      ref={navRef}
      as={motion.div}
      initial={false}
      animate={{
        width: isOpen ? "calc(100% - 2rem)" : "60px",
        borderRadius: isOpen ? "33px" : "30px",
      }}
      transition={{ type: "spring", stiffness: 450, damping: 40 }}>
      <S.Nav>
        <S.HamburgerWrapper onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
          <S.Hamburger />
        </S.HamburgerWrapper>

        <AnimatePresence mode="wait">
          {isOpen && (
            <S.LinksContainer
              key={isIsoMode ? "iso" : "edu"}
              as={motion.div}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}>
              {/* --- PRZEŁĄCZNIK TRYBU (Tylko dla Admina) --- */}
              {isAdmin && (
                <S.LinkContent
                  onClick={handleToggleMode}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    width: "50%",
                    paddingRight: "0.5rem",
                    marginRight: "0.5rem",
                    borderRight: "1px solid white",
                    fontSize: "0.7rem",
                  }}>
                  <S.ToggleIcon />{" "}
                  {/* Dodaj tę ikonę w Styles.ts, np. ikona wymiany/strzałek */}
                  {isIsoMode ? "EDU" : "DOCS"}
                </S.LinkContent>
              )}
              {!isIsoMode ? (
                /* --- LINKI EDUKACJA --- */
                <>
                  <Link
                    to="/dashboard"
                    data-is-active={
                      currentPath === "/dashboard" ? "true" : "false"
                    }>
                    <S.LinkContent>
                      <S.ContentIcon />
                      <span>{languages.content[lang]}</span>
                    </S.LinkContent>
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/users"
                      data-is-active={
                        currentPath === "/users" ? "true" : "false"
                      }>
                      <S.LinkContent>
                        <S.PeopleIcon />
                        <span>{languages.users[lang]}</span>
                      </S.LinkContent>
                    </Link>
                  )}
                </>
              ) : (
                /* --- LINKI ISO --- */
                <>
                  <Link
                    to="/iso/orders"
                    data-is-active={
                      currentPath === "/iso/orders" ? "true" : "false"
                    }>
                    <S.LinkContent>
                      <S.OrdersIcon />
                      <span>{languages.orders?.[lang] || "Zamówienia"}</span>
                    </S.LinkContent>
                  </Link>
                </>
              )}
              {role === "user" && 
              <Link
                to="/profile"
                data-is-active={currentPath === "/profile" ? "true" : "false"}>
                <S.LinkContent>
                  <S.ProfileIcon />
                  <span>{languages.profile[lang]}</span>
                </S.LinkContent>
              </Link>
}
            </S.LinksContainer>
          )}
        </AnimatePresence>
      </S.Nav>
    </S.Container>
  );
};

export default BottomNav;
