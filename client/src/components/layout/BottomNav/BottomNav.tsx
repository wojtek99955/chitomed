import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthData } from "../../../features/auth/hooks/useAuthData";
import { useLanguage } from "../../../features/language/useLanguage";
import { languages } from "./languages";
import * as S from "./Styles";

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const dashboardPath = "/dashboard";
  const usersPath = "/users";
  const profilePath = "/profile";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Scroll w górę → pokazujemy
          if (currentScrollY < lastScrollY.current) {
            setIsOpen(true);
          }
          // Scroll w dół → chowamy
          else if (currentScrollY > lastScrollY.current) {
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

  // Zamknij menu po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { role } = useAuthData();
  let isAdmin = role === "admin";
  const lang = useLanguage();

  return (
    <S.Container
      ref={navRef}
      as={motion.div}
      initial={false}
      animate={{
        width: isOpen ? "calc(100% - 2rem)" : "60px",
        borderRadius: isOpen ? "33px" : "30px",
      }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 40,
        restDelta: 0.06,
      }}>
      <S.Nav>
        <S.HamburgerWrapper onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
          <S.Hamburger />
        </S.HamburgerWrapper>

        <AnimatePresence>
          {isOpen && (
            <S.LinksContainer
              as={motion.div}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}>
              <Link
                to={dashboardPath}
                data-is-active={
                  currentPath === dashboardPath ? "true" : "false"
                }>
                <S.LinkContent>
                  <S.ContentIcon /> <span>{languages.content[lang]}</span>
                </S.LinkContent>
              </Link>
              {isAdmin && (
                <Link
                  to={usersPath}
                  data-is-active={currentPath === usersPath ? "true" : "false"}>
                  <S.LinkContent>
                    <S.PeopleIcon />
                    <span>{languages.users[lang]}</span>
                  </S.LinkContent>
                </Link>
              )}
              <Link
                to={profilePath}
                data-is-active={currentPath === profilePath ? "true" : "false"}>
                <S.LinkContent>
                  <S.ProfileIcon />
                  <span>{languages.profile[lang]}</span>
                </S.LinkContent>
              </Link>
            </S.LinksContainer>
          )}
        </AnimatePresence>
      </S.Nav>
    </S.Container>
  );
};

export default BottomNav;
