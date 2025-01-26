import React, { useEffect, useState } from "react";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Item from "./items/Item";
import CustomSubMenu from "./items/SubMenu";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MailIcon from "@mui/icons-material/MailOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "../../context/UserContext";
import { useCollapsed } from "../../context/CollapsedContext";
import { useLocation } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";

const BarraLateral = () => {
  const theme = useTheme();
  const { tipoUsuario } = useUser();

  const { collapsed } = useCollapsed();
  const location = useLocation();

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
        {tipoUsuario === "parceiro" && (
          <>
            <Item
              sx={{ mt: 2 }}
              smallText={false}
              active={location.pathname === "/"}
              icon={<HomeIcon />}
              linkTo="/"
              text="Home"
            />
            <Item
              smallText={false}
              active={location.pathname === "/dashboard"}
              icon={<DashboardOutlinedIcon />}
              linkTo="/dashboard"
              text="Dashboard"
            />
            {/* <CustomSubMenu
              label="Eventos"
              icon={<ConfirmationNumberOutlinedIcon />}
            > */}
            <Item
              active={location.pathname === "/eventos"}
              smallText={false}
              linkTo="/eventos"
              icon={<CelebrationOutlinedIcon />}
              text="Eventos"
            />
            {/* <Item
                active={location.pathname === "/eventos-abertos"}
                theme={theme.palette.primary.lighter}
                linkTo="/eventos-abertos"
                icon={<CheckBoxOutlinedIcon />}
                text="Eventos abertos"
              /> */}
            {/* </CustomSubMenu> */}
            {/* <CustomSubMenu label="Demandas" icon={< />}> */}
            <Item
              active={location.pathname === "/demandas"}
              smallText={false}
              linkTo="/demandas"
              icon={<AssignmentOutlinedIcon />}
              text="Demandas"
            />
            <Item
              active={location.pathname === "/check-in"}
              smallText={false}
              linkTo="/check-in"
              icon={<QrCodeIcon />}
              text="Check in"
            />
            {/* <Item
                active={location.pathname === "/demandas-abertas"}
                theme={theme.palette.primary.lighter}
                linkTo="/demandas-abertas"
                icon={<CheckBoxOutlinedIcon />}
                text="Demandas abertas"
              /> */}
            {/* </CustomSubMenu> */}
            <CustomSubMenu label="Equipe" icon={<GroupIcon />}>
              {/* <Item onClick={() => handleActivateItem('i8')} active={activeItem === 'i8'} theme={theme.palette.primary.lighter} linkTo="/escala" icon={<EditCalendarOutlinedIcon />} text="Escala" /> */}
              <Item
                active={location.pathname === "/formularios"}
                theme={theme.palette.primary.lighter}
                linkTo="/formularios"
                icon={<ArticleOutlinedIcon />}
                text="Formulários"
              />
              <Item
                active={location.pathname === "/parceiros"}
                theme={theme.palette.primary.lighter}
                linkTo="/parceiros"
                icon={<ContactsOutlinedIcon />}
                text="Colaboradores"
              />
            </CustomSubMenu>
          </>
        )}

        {tipoUsuario === "colaborador" && (
          <>
            <Item
              sx={{ mt: 2 }}
              smallText={false}
              active={location.pathname === "/"}
              icon={<HomeIcon />}
              linkTo="/"
              text="Home"
            />
            <Item
              active={location.pathname === "/eventos-confirmados"}
              theme={theme.palette.primary.lighter}
              linkTo="/eventos-confirmados"
              icon={<CelebrationOutlinedIcon />}
              text="Eventos"
            />
            {/* <Item
              active={location.pathname === "/eventos-pendentes"}
              theme={theme.palette.primary.lighter}
              linkTo="/eventos-pendentes"
              icon={<AccessTimeIcon />}
              text="Eventos pendentes"
            />
            <Item
              active={location.pathname === "/eventos/buscar"}
              theme={theme.palette.primary.lighter}
              linkTo="/eventos/buscar"
              icon={<SearchIcon />}
              text="Buscar"
            /> */}
            <Item
              active={location.pathname === "/convites"}
              theme={theme.palette.primary.lighter}
              linkTo="/convites"
              icon={<MailIcon />}
              text="Convites"
            />
          </>
        )}
      </Menu>
    </Sidebar>
  );
};

export default BarraLateral;
