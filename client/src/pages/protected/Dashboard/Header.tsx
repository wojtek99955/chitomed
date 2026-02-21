import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../../../features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
// import { MdLogout } from "react-icons/md";
import Logo1 from "../../../assets/icons/Logo1";

const Container = styled.header`
  padding: 0.5rem 1rem;
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  /* box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px; */
  border-bottom: 1px solid #e9eaed;
  height: 4.5rem;
  z-index: 100;
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
color:white;
border:none;
padding: 1rem 2.5rem;
font-size: 1rem;
font-weight: 400;
cursor: pointer;
`

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
margin-left: auto;
margin-right: 1rem;
padding:1rem;
border-radius: 50%;
cursor: pointer;
`

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
  return (
    <Container>
      <div onClick={goDashboard} style={{ cursor: "pointer" }}>
        <Logo1 />
      </div>
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
    </Container>
  );
};

export default Header;
