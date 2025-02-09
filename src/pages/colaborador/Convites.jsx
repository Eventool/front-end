import { useEffect, useState } from "react";
import MudarVisualizacao from "../../components/mudarVisualizacao/MudarVisualizacao";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import img from "../../assets/evento-card-bg.png";
import { useTheme } from "@emotion/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PetsIcon from "@mui/icons-material/Pets";
import { fetchData, patchData } from "../../services/DataService";
import { useAlerta } from "../../context/AlertaContext";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import InfoIcon from "@mui/icons-material/Info";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import dayjs from "dayjs";
import Botao from "../../components/btn/Botao";
import EditorRichText from "../../components/input/EditorRichText";
import { formatCurrency, numToMes } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLayout } from "../../layouts/Layout";

const Convites = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Convites");
    setActions(null);
  });

  const [modalOpen, setModalOpen] = useState(false);

  const toggleDialog = () => {
    setModalOpen(!modalOpen);
  };

  const [convitesData, setConvitesData] = useState([]);
  const [convites, setConvites] = useState([]);
  const [conviteSelecionado, setConviteSelecionado] = useState({});
  const alerta = useAlerta();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `agendamentos/usuario/${Cookies.get("ID")}`
      );

      if (response.error) {
        alerta.error("Não foi possível buscar convites");
        return;
      }

      setConvites(response.filter((convite) => convite.status === "Pendente"));
      setConvitesData(response);
    })();
  }, [alerta]);

  const handleOpenConvite = (e) => {
    const convite = convites.find((convite) => convite.id === e.target.value);

    if (!convite) {
      return;
    }

    setConviteSelecionado(convite);
    toggleDialog();
  };

  const handleCloseConvite = () => {
    setModalOpen(false);
  };

  const handleAceitarConvite = async (e) => {
    const response = await patchData("agendamentos", e.target.value, "accept");

    if (response.error) {
      alerta.error("Erro ao aceitar convite");
    }

    alerta.success("Convite aceito com sucesso");
    handleCloseConvite();
    navigate(`/convites/${e.target.value}`);
  };

  const handleRejeitarConvite = async (e) => {
    const response = await patchData("agendamentos", e.target.value, "reject");

    if (response.error) {
      alerta.error("Erro ao rejeitar convite");
    }

    alerta.success("Convite rejeitado com sucesso");
    handleCloseConvite();
  };

  return (
    <>
      <ModalConvite
        convite={conviteSelecionado}
        open={modalOpen}
        handleClose={handleCloseConvite}
        handleAceitar={handleAceitarConvite}
        handleRejeitar={handleRejeitarConvite}
      />
      <MudarVisualizacao />
      <Box display={"flex"} flexWrap={"wrap"} gap={2} mt={2}>
        {convites &&
          convites.map((item, index) => {
            return (
              <CardConvite
                handleClick={handleOpenConvite}
                key={index}
                convite={item}
              />
            );
          })}
        {convites.length === 0 && (
          <Box mt={5} width="100%" className="flexRowCenter">
            <Typography>Nenhum convite encontrado</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export const CardConvite = ({ convite, handleClick = () => {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{ width: { sm: "100%", md: 300 }, borderRadius: 2 }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: { sm: "100%", md: 300 },
          maxWidth: "100%",
          background: `linear-gradient(to top, #000000ff, #00000077), url(${
            convite.imagem ? convite.imagem.url : img
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Box p={2} display={"flex"} height={100}>
            <Typography
              color={"white"}
              sx={{ wordBreak: "break-word" }}
              textAlign={"left"}
              alignSelf={"flex-end"}
              variant="h5"
            >
              {convite.nome}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
            p={2}
            className="flexColumnCenter"
            bgcolor={theme.palette.white.main}
            height={"30%"}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              gap={1}
              my={1}
            >
              <Bagde
                sx={{
                  border: "1px solid",
                  borderColor: "secondary.main",
                }}
              >
                <PersonIcon color="secondary" fontSize={"medium"} />
                <Typography color="secondary.main" fontSize={14}>
                  {convite.funcao}
                </Typography>
              </Bagde>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                my={1}
              >
                <Bagde>
                  <CalendarMonthIcon fontSize={"small"} />
                  <Typography fontSize={12}>
                    {dayjs(convite.horarioEntrada).format("DD")}
                  </Typography>
                  <Typography fontSize={12}>
                    {numToMes(dayjs(convite.horarioEntrada).month())}
                  </Typography>
                </Bagde>
                <Bagde>
                  <AccessTimeIcon fontSize={"small"} />
                  <Typography fontSize={12}>{`${dayjs(
                    convite.horarioEntrada
                  ).format("HH:mm")} às ${dayjs(convite.horarioSaida).format(
                    "HH:mm"
                  )}`}</Typography>
                </Bagde>
                <Bagde>
                  <PlaceIcon fontSize={"small"} />
                  <Typography fontSize={12}>
                    {convite.endereco.local}
                  </Typography>
                </Bagde>
                <Bagde>
                  <PaymentsIcon fontSize={"small"} />
                  <Typography fontSize={12}>
                    {formatCurrency(convite.cache)}
                  </Typography>
                </Bagde>
              </Box>

              <Button
                value={convite.id}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleClick}
                startIcon={<InfoIcon />}
              >
                Informações
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Bagde = ({ children, color = "white.main", sx, borderColor }) => {
  return (
    <Box
      p={0.8}
      justifySelf={"flex-end"}
      borderRadius={3}
      bgcolor={color}
      display={"flex"}
      border={borderColor}
      gap={0.8}
      justifyContent={"center"}
      alignItems={"center"}
      sx={sx}
    >
      {children}
    </Box>
  );
};

const ModalConvite = ({
  convite,
  open,
  handleAceitar,
  handleRejeitar,
  handleClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          background: `linear-gradient(to top, #000000ff, #00000022), url(${
            convite.imagem ? convite.imagem.url : img
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: 100,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <Typography variant="h6" color="white">
          {convite.nome}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid2 mt={5} container spacing={2}>
          <ColumnTextField label={"Nome do evento"} value={convite.nome} />
          <ColumnTextField label={"Função"} value={convite.funcao} />
          <ColumnTextField
            label={"Data"}
            value={dayjs(convite.horarioEntrada).format("DD/MM")}
          />
          <ColumnTextField label={"Local"} value={convite.endereco?.local} />
          <ColumnTextField
            label={"Horário de entrada"}
            value={dayjs(convite.horarioEntrada).format("HH:mm")}
          />
          <ColumnTextField
            label={"Horário de saída"}
            value={dayjs(convite.horarioSaida).format("HH:mm")}
          />
          <ColumnTextField
            label={"Cachê"}
            value={formatCurrency(convite.cache)}
          />
          <ColumnTextField label={"Uniforme"} value={"Casual"} />
          <EditorRichText readOnly />
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleAceitar}
          value={convite.id}
          startIcon={<CheckCircleOutlineIcon />}
        >
          Aceitar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleRejeitar}
          value={convite.id}
          startIcon={<CancelOutlinedIcon />}
        >
          Rejeitar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ColumnTextField = ({ label, value, size = { xs: 12, sm: 6 } }) => {
  return (
    <Grid2 item size={size}>
      <TextField
        fullWidth
        variant="standard"
        label={label}
        value={value}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </Grid2>
  );
};

export default Convites;
