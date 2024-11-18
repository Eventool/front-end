import { Box, ButtonBase, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/evento-card-bg.png";
import { useTheme } from "@emotion/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CardDemanda = ({ date, evento, titulo, handleClick }) => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{ width: { sm: "100%", md: 300 }, borderRadius: 2 }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: { sm: "100%", md: 300 },
          maxWidth: "100%",
          background: `linear-gradient(to top, #000000ff, #00000033), url(${
            evento.imagem ? evento.imagem.url : img
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <Box display={"flex"} flexDirection={"column"} height={200}>
          <Box p={2} display={"flex"} height={"70%"}>
            <Typography
              color={"white"}
              sx={{ wordBreak: "break-word" }}
              textAlign={"left"}
              alignSelf={"flex-end"}
              variant="h5"
            >
              {titulo}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
            p={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            bgcolor={theme.palette.white.main}
            height={"30%"}
          >
            <Typography fontSize={12}>{evento.nome}</Typography>
            <Box
              p={0.7}
              justifySelf={"flex-end"}
              borderRadius={3}
              bgcolor={theme.palette.secondary.main}
              display={"flex"}
              gap={0.7}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CalendarMonthIcon fontSize={"small"} color="white" />
              <Typography color={"white"} fontSize={12}>
                {date.dia}
              </Typography>
              <Typography color={"white"} fontSize={12}>
                {date.mes}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default CardDemanda;
