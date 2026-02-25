import { useState, useRef, useEffect } from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../assets/device";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthData } from "../../features/auth/useAuthData";
import { FaRegUser } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";

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

  return (
    <Container
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
      <Nav>
        <HamburgerWrapper onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
          <Hamburger />
        </HamburgerWrapper>

        <AnimatePresence>
          {isOpen && (
            <LinksContainer
              as={motion.div}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}>
              <Link
                to={dashboardPath}
                data-is-active={
                  currentPath === dashboardPath ? "true" : "false"
                }
                // onClick={() => setIsOpen(false)}
              >
                <ContentIcon /> <span>Treść</span>
              </Link>
              {isAdmin && (
                <Link
                  to={usersPath}
                  data-is-active={currentPath === usersPath ? "true" : "false"}
                  // onClick={() => setIsOpen(false)}
                >
                  <PeopleIcon />
                  <span>Użytkownicy</span>
                </Link>
              )}
              <Link
                to={profilePath}
                data-is-active={currentPath === profilePath ? "true" : "false"}
                // onClick={() => setIsOpen(false)}
              >
                <ProfileIcon />
                <span>Profil</span>
              </Link>
            </LinksContainer>
          )}
        </AnimatePresence>
      </Nav>
    </Container>
  );
};

export default BottomNav;

// ────────────────────────────────────────────────
// Styled Components
// ────────────────────────────────────────────────

const Container = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(4px);
  z-index: 1000;
  overflow: hidden;
  height: 60px;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    display: none;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 5px;
  gap: 0.5rem;
  white-space: nowrap;
`;

const LinksContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7rem;
    transition: all 0.2s;
    padding: 0.5rem;
    border-radius: 28px;
    width: 100%;
    max-height: 50px;

    span {
      margin-top: 2px;
    }

    &[data-is-active="true"] {
      background-color: #2d50dc;
      color: white;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const HamburgerWrapper = styled.div<{ $active: boolean }>`
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2d50dc" : "transparent")};
  transition: background-color 0.3s;
`;

const Hamburger = styled(HiOutlineMenuAlt1)`
  font-size: 1.6rem;
  color: white;
`;

const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.4rem;
`;

const ContentIcon = styled(RxVideo)`
  font-size: 1.4rem;
`;
const ProfileIcon = styled(FaRegUser)`
  font-size: 1rem;
`;
