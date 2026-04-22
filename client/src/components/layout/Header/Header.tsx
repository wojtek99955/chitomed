import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../../../features/auth/api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import Logo1 from "../../../assets/icons/Logo1";
import Categories from "../../../pages/protected/features/categories/components/Categories";
import Searchbar from "../../../pages/protected/features/Searchbar/Searchbar";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";
import { useAuthData } from "../../../features/auth/hooks/useAuthData";
import { ChitomedIcon } from "../../../assets/icons/ChitomedIcon";
import SortDateUsers from "../../../pages/protected/features/users/components/SortDate";
import SearchUser from "../../../pages/protected/features/users/components/SearchUser";
import { useLanguage } from "../../../features/language/useLanguage";
import { languages } from "./languages";
import * as S from "./Styles";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { role } = useAuthData();
  let isAdmin = role === "admin";
  let lang = useLanguage();
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

  const logout = () => {
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

    if (path.startsWith("/dashboard")) return languages.materialsTitle[lang];
    if (path.startsWith("/profile")) return languages.profile[lang];
    if (path.startsWith("/users")) return languages.users[lang];

    if (path.startsWith("/material")) return languages.materialsDetails[lang];
    if (path.startsWith("/iso/orders")) return "Zamówienia";
    if (path.startsWith("/iso/links")) return "Linki";

    return "Chitomed materials"; // Tytuł domyślny
  };
  return (
    <S.Container isAdmin={isAdmin}>
      <S.Wrapper>
        <S.LogoWrapper onClick={goDashboard} style={{ cursor: "pointer" }}>
          <Logo1 />
          {ChitomedIcon}
        </S.LogoWrapper>
        <LanguageChangeDropdown />
        <S.Profile onClick={goToProfile}>
          <S.UserIcon />
        </S.Profile>
        <S.LogoutBtn onClick={logout}>Log out</S.LogoutBtn>
        <S.LogoutIconContainer onClick={logout}>
          <S.LogoutIcon />
        </S.LogoutIconContainer>
      </S.Wrapper>
      <S.SubHeader>
        {getSubHeaderTitle()}
        {location.pathname === "/dashboard" && (
          <S.FitlersWrapper>
            <Categories />
            <Searchbar />
          </S.FitlersWrapper>
        )}
        {location.pathname === "/users" && (
          <S.FitlersWrapper>
            <SortDateUsers />
            <SearchUser />
          </S.FitlersWrapper>
        )}
      </S.SubHeader>
    </S.Container>
  );
};

export default Header;
