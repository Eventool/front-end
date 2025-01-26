import React from "react";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";
import Item from "./items/Item";
import CustomSubMenu from "./items/SubMenu";
import { useUser } from "../../context/UserContext";
import { useCollapsed } from "../../context/CollapsedContext";
import { useLocation } from "react-router-dom";

const BarraLateral = ({ menuItems }) => {
  const theme = useTheme();
  const { tipoUsuario } = useUser();

  const { collapsed } = useCollapsed();
  const location = useLocation();

  const renderMenuItems = (items) =>
    items.map((item, index) =>
      item.isSubMenu ? (
        <CustomSubMenu key={index} label={item.label} icon={item.icon}>
          {item.items.map((subItem, subIndex) => (
            <Item
              key={subIndex}
              active={location.pathname === subItem.activePath}
              linkTo={subItem.linkTo}
              icon={subItem.icon}
              text={subItem.text}
              theme={theme.palette[subItem.theme]}
            />
          ))}
        </CustomSubMenu>
      ) : (
        <Item
          key={index}
          sx={item.sx}
          smallText={item.smallText}
          active={location.pathname === item.activePath}
          linkTo={item.linkTo}
          icon={item.icon}
          text={item.text}
        />
      )
    );

  return (
    <Sidebar
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          width: collapsed ? "80px" : "260px",
          // transition: "300ms",
          zIndex: theme.zIndex.drawer,
        },
      }}
    >
      <Menu
        closeOnClick
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active
                ? theme.palette.primary.light
                : theme.palette.primary.main,
              "&:hover": {
                backgroundColor: active
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
              },
            };
          },
        }}
      >
        {tipoUsuario && renderMenuItems(menuItems[tipoUsuario])}
      </Menu>
    </Sidebar>
  );
};

export default BarraLateral;
