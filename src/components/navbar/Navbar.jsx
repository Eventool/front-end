import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  ButtonBase,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Botao from "../btn/Botao";
import { ArrowDropDown, Circle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { useCollapsed } from "../../context/CollapsedContext";

const Navbar = () => {
  const { toggleCollapsed } = useCollapsed();

  return (
    <AppBar elevation={4} position="static">
      <Toolbar display="flex" sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems={"center"}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleCollapsed}
          >
            <MenuIcon />
          </IconButton>
          <ButtonBase component={Link} to="/" disableRipple>
            <Box component={"img"} src={logo} height={"48px"} />
          </ButtonBase>
        </Box>

        <Box display={"flex"} gap={2}>
          <Notificacoes />
          <MenuPerfil />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const MenuPerfil = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    //console.log(e.target.id);
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    handleClose(e);

    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", gap: 0, alignItems: "flex-end" }}>
      <Tooltip title="Perfil">
        <ButtonBase
          centerRipple
          onClick={handleClick}
          sx={{ borderRadius: "50%" }}
        >
          <Avatar>L</Avatar>
        </ButtonBase>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem id="item1" onClick={handleClose}>
          <Avatar sx={{ width: 25, height: 25 }}>L</Avatar>{" "}
          <Typography ml={1} mr={2}>
            {sessionStorage.getItem("nome")}
          </Typography>
        </MenuItem>
        <Divider />
        {/* <MenuItem id="item2" onClick={handleClose}>
          <Avatar sx={{ width: 25, height: 25 }}></Avatar>{" "}
          <Typography ml={1} mr={2}>
            Coisa 1
          </Typography>
        </MenuItem>
        <MenuItem id="item3" onClick={handleClose}>
          <Avatar sx={{ width: 25, height: 25 }}></Avatar>{" "}
          <Typography ml={1} mr={2}>
            Coisa 2
          </Typography>
        </MenuItem>
        <MenuItem id="item4" onClick={handleClose}>
          <Avatar sx={{ width: 25, height: 25 }}></Avatar>{" "}
          <Typography ml={1} mr={2}>
            Coisa 3
          </Typography>
        </MenuItem>
        <MenuItem id="item5" onClick={handleClose}>
          <Avatar sx={{ width: 25, height: 25 }}></Avatar>{" "}
          <Typography ml={1} mr={2}>
            Coisa 4
          </Typography>
        </MenuItem> */}
        <MenuItem
          id="item6"
          component={Link}
          to="/configuracoes"
          onClick={handleClose}
        >
          <SettingsIcon sx={{ fontSize: 20 }} />
          <Typography ml={1} mr={2}>
            Configurações
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem id="item7" onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 20 }} />
          <Typography ml={1} mr={2}>
            Sair
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

const Notificacoes = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    //console.log(e.target.id);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", gap: 0, alignItems: "flex-end" }}>
      <Tooltip title="Notificações">
        <ButtonBase
          centerRipple
          onClick={handleClick}
          sx={{ borderRadius: "50%" }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color={theme.palette.paper.dark}
          >
            <NotificationsIcon sx={{ fontSize: 30 }} />
          </Box>
        </ButtonBase>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          width: 450,
          "& .MuiMenu-list": {
            pb: 0,
          },
        }}
      >
        <Typography fontSize={17} ml={2} mb={1}>
          Notificações
        </Typography>
        <Divider />
        <Box
          sx={{ bgcolor: theme.palette.paper.main, width: 500, pb: 1, pt: 1 }}
        >
          <MenuItem id="item2" onClick={handleClose}>
            <Typography ml={1} mr={2}>
              Notificação 1
            </Typography>
          </MenuItem>
          <MenuItem id="item3" onClick={handleClose}>
            <Typography ml={1} mr={2}>
              Notificação 2
            </Typography>
          </MenuItem>
          <MenuItem id="item4" onClick={handleClose}>
            <Typography ml={1} mr={2}>
              Notificação 3
            </Typography>
          </MenuItem>
          <MenuItem id="item5" onClick={handleClose}>
            <Typography ml={1} mr={2}>
              Notificação 4
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};
