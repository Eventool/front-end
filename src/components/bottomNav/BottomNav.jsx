import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const BottomNav = ({ menuItems }) => {
  const { tipoUsuario } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const currentItems =
    menuItems[tipoUsuario]?.filter((item) => !item.isSubMenu) || [];

  return (
    <BottomNavigation
      sx={{
        backgroundColor: theme.palette.primary.dark,
      }}
      value={location.pathname}
    >
      {currentItems.map((item, index) => (
        <BottomNavigationAction
          key={index}
          label={item.text}
          icon={item.icon}
          value={item.activePath}
          onClick={() => navigate(item.linkTo)}
          sx={{
            color: "#ffffff",
            "&.Mui-selected": {
              color: "#ffffff",
              backgroundColor: theme.palette.primary.main,
            },
          }}
          selected={location.pathname === item.activePath}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
