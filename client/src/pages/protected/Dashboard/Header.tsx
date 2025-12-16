import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import Logo from "../../../assets/icons/Logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../../../features/auth/api/authApi";
import { useNavigate } from "react-router-dom";

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

const UserWrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserIcon = styled(FaRegUser)`
  font-size: 1.2rem;
  display: block;
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 10;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: .9rem 1rem;
  font-size: 1.1rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const dropdownVariants: any = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

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
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logout = () => {
    setIsDropdownOpen(false);
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
    navigate("/dashboard")
  }

  return (
    <Container>
      <div onClick={goDashboard} style={{cursor:"pointer"}}>
        <Logo />
      </div>
      <UserWrapper ref={dropdownRef} onClick={toggleDropdown}>
        <UserIcon />
        <AnimatePresence>
          {isDropdownOpen && (
            <DropdownContainer
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem onClick={logout}>Log Out</DropdownItem>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </UserWrapper>
    </Container>
  );
};

export default Header;
