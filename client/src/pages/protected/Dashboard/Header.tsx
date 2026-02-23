import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../../../features/auth/api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
// import { MdLogout } from "react-icons/md";
import Logo1 from "../../../assets/icons/Logo1";
import Categories from "../features/categories/components/Categories";
import Searchbar from "../features/Searchbar/Searchbar";
import { device } from "../../../assets/device";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";

const Container = styled.header`
  padding: 10px 1rem;
  position: fixed;
  width: 100%;
  left: 0;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 1rem;

  background-color: white;
  /* box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px; */
  /* border-bottom: 1px solid #e9eaed; */
  z-index: 100;
  border-bottom: 1px solid #e9eaed;
  @media ${device.laptop} {
    width: calc(100% - 18rem);
    left: 15rem;
  }
`;

const Wrapper = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubHeader = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
`;

// const UserWrapper = styled.div`
//   position: relative;
//   cursor: pointer;
//   margin-left: auto;
//   padding: 0.6rem;
//   border-radius: 4px;
//   background-color: #f0f0f0;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #dde0e5;
//   }
// `;

const UserIcon = styled(FaRegUser)`
  font-size: 1.2rem;
  display: block;
  color:white;
`;

// const DropdownContainer = styled(motion.div)`
//   position: absolute;
//   top: 100%;
//   right: 0;
//   margin-top: 8px;
//   background: white;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   min-width: 150px;
//   z-index: 10;
//   overflow: hidden;
// `;
// const UserIconDropdown = styled(FaRegUser)`
// font-size: 1.2rem;
// `;
// const LogoutIcon = styled(MdLogout)`
//   font-size: 1.2rem;
// `;

const LogoutBtn = styled.button`
  border-radius: 33px;
  background-color: black;
  color: white;
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    transform: scale(1.02);
    background-color: #262626;
  }
  &:active {
    transform: scale(0.95);
  }
`;

// const DropdownItem = styled.div`
//   padding: 0.9rem 1rem;
//   font-size: 1.1rem;
//   display: flex;
//   align-items: center;
//   gap:.5rem;
//   color: #333;
//   cursor: pointer;

//   &:hover {
//     background-color: #f5f5f5;
//   }
// `;

// const dropdownVariants: any = {
//   hidden: {
//     opacity: 0,
//     height: 0,
//     transition: {
//       when: "afterChildren",
//       duration: 0.2,
//     },
//   },
//   visible: {
//     opacity: 1,
//     height: "auto",
//     transition: {
//       when: "beforeChildren",
//       duration: 0.2,
//       ease: "easeOut",
//     },
//   },
// };

const Profile = styled.div`
  background-color: black;
  margin-right: 1rem;
  padding: 0.9rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    transform: scale(1.02);
    background-color: #262626;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logoutMutationHook = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("token");
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error:", error);
      navigate("/login");
    },
  });
  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  const logout = () => {
    // setIsDropdownOpen(false);
    logoutMutationHook.mutate();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const goDashboard = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  const location = useLocation();
  const getSubHeaderTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/dashboard")) return "Chitomed materials";
    if (path.startsWith("/profile")) return "Profile";
    if (path.startsWith("/users")) return "Users list";

    // Opcjonalnie: obsługa detali materiału (np. /material/123)
    if (path.startsWith("/material")) return "Material details";

    return "Chitomed materials"; // Tytuł domyślny
  };
  return (
    <Container>
      <Wrapper>
        <div onClick={goDashboard} style={{ cursor: "pointer" }}>
          <Logo1 />
        </div>
        <LanguageChangeDropdown/>
        <Profile onClick={goToProfile}>
          <UserIcon />
        </Profile>
        {/* <UserWrapper ref={dropdownRef} onClick={toggleDropdown}>
        <UserIcon />
        <AnimatePresence>
          {isDropdownOpen && (
            <DropdownContainer
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}>
              <DropdownItem onClick={goToProfile}>
                <UserIconDropdown /> Profile
              </DropdownItem>
              <DropdownItem onClick={logout}>
                <LogoutIcon /> Log Out
              </DropdownItem>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </UserWrapper> */}
        <LogoutBtn onClick={logout}>Log out</LogoutBtn>
      </Wrapper>
      <SubHeader>
        {getSubHeaderTitle()}
        {location.pathname === "/dashboard" && (
          <>
            <Categories />
            <Searchbar />
          </>
        )}
      </SubHeader>{" "}
    </Container>
  );
};

export default Header;
