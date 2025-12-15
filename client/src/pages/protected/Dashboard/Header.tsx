import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import Logo from "../../../assets/icons/Logo";

const Container = styled.header`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
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
  padding: 10px 15px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;


const dropdownVariants :any = {
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  return (
    <Container>
      <Logo/>
      <UserWrapper onClick={toggleDropdown}>
        <UserIcon />

        {/* AnimatePresence jest wymagane, aby animacja ukrywania działała poprawnie */}
        <AnimatePresence>
          {isDropdownOpen && (
            <DropdownContainer
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Log Out</DropdownItem>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </UserWrapper>
    </Container>
  );
};

export default Header;
