import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailIcon from "@mui/icons-material/MailOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";

const Home = ({ setTitulo, setActions }) => {
  useEffect(() => {
    setTitulo("");
    setActions(null);
  });

  const iconStyle = { color: "secondary", fontSize: "large" };

  const homeItemsParceiro = [
    {
      label: "Dashboard",
      icon: <DashboardOutlinedIcon {...iconStyle} />,
      linkTo: "/dashboard",
    },
    {
      label: "Eventos",
      icon: <CelebrationOutlinedIcon {...iconStyle} />,
      linkTo: "/eventos",
    },
    {
      label: "Demandas",
      icon: <AssignmentOutlinedIcon {...iconStyle} />,
      linkTo: "/demandas",
    },
    {
      label: "Equipe",
      icon: <GroupOutlinedIcon {...iconStyle} />,
      linkTo: "/parceiros",
    },
    {
      label: "Check-in",
      icon: <QrCodeIcon {...iconStyle} />,
      linkTo: "/check-in",
    },
    {
      label: "Formulários",
      icon: <DescriptionOutlinedIcon {...iconStyle} />,
      linkTo: "/formularios",
    },
  ];
  const homeItemsColaborador = [
    {
      label: "Eventos",
      icon: <CelebrationOutlinedIcon {...iconStyle} />,
      linkTo: "/eventos-confirmados",
    },
    {
      label: "Convites",
      icon: <MailIcon {...iconStyle} />,
      linkTo: "/convites",
    },
  ];

  return (
    <Box height="100%" m={4}>
      <Box
        className="flexRowStart"
        sx={{ bgcolor: "primary.main", p: 4, gap: 3, borderRadius: 2 }}
      >
        <Avatar sx={{ width: 80, height: 80 }} />
        <Typography color="white" variant="h5">
          Bem vindo(a), {sessionStorage.getItem("nome")}
        </Typography>
      </Box>
      <Box
        className="flexRowCenter"
        sx={{ height: "70%" }}
        p={4}
        gap={4}
        flexWrap="wrap"
      >
        {sessionStorage.tipoUsuario === "parceiro" &&
          homeItemsParceiro.map((item, index) => {
            return <HomeCard key={index} {...item} />;
          })}

        {sessionStorage.tipoUsuario === "colaborador" &&
          homeItemsColaborador.map((item, index) => {
            return <HomeCard key={index} {...item} />;
          })}
      </Box>
    </Box>
  );
};

const HomeCard = ({ linkTo, label, icon }) => {
  const navigate = useNavigate();

  return (
    <CardActionArea
      onClick={() => navigate(linkTo)}
      sx={{
        bgcolor: "#ffffff",
        width: { xs: "100%", md: 160 },
        height: 160,
        minWidth: { xs: "100%", md: 160 },
        minHeight: 160,
        p: 2,
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <Box
        className="flexColumn"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Typography variant="body1">{label}</Typography>
        <Box alignSelf="flex-end">{icon}</Box>
      </Box>
    </CardActionArea>
  );
};

export default Home;
