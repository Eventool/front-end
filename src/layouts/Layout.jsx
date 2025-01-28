import { createContext, useContext, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BarraLateral from "../components/sidebar/BarraLateral";
import Dashboard from "../pages/Dashboard";
import CriarDemandas from "../pages/demandas/criarDemandas/CriarDemandas";
import Escala from "../pages/Escala";
import Formularios from "../pages/formulario/Formularios";
import Parceiros from "../pages/Parceiros";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Demandas from "../pages/demandas/Demandas";
import Eventos from "../pages/eventos/Eventos";
import CriarEvento from "../pages/eventos/criarEventos/CriarEvento";
import RegistroEvento from "../pages/eventos/RegistroEvento";
import ConfirmDialog from "../components/dialogo/ConfirmDialog";
import ProtectedRoute from "./ProtectedRoute ";
import EventosConfirmados from "../pages/colaborador/Confirmados";
import EventosPendentes from "../pages/colaborador/Pendentes";
import Convites from "../pages/colaborador/Convites";
import BuscarEventos from "../pages/colaborador/BuscarEventos";
import Configuracoes from "../pages/Configuracoes";
import { useCollapsed } from "../context/CollapsedContext";
import RegistroDemanda from "../pages/demandas/RegistroDemanda";
import RegistroFormulario from "../pages/formulario/RegistroFormulario";
import RegistroConvite from "../pages/colaborador/RegistroConvite";
import CheckIn from "../pages/CheckIn";
import ConfirmarAgendamento from "../pages/ConfirmarAgendamento";
import BottomNav from "../components/bottomNav/BottomNav";
import { useTheme } from "@emotion/react";
import Cadastro from "../pages/Cadastro";
import PaginaUsuario from "../pages/PaginaUsuario";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/MailOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useUser } from "../context/UserContext";
import { guestPages } from "../utils/util";
import GuestRoute from "./GuestRoute";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const Layout = () => {
  const location = useLocation();

  const menuItems = {
    parceiro: [
      {
        smallText: false,
        activePath: "/",
        icon: <HomeIcon />,
        linkTo: "/",
        text: "Home",
        sx: { mt: 2 },
      },
      {
        smallText: false,
        activePath: "/dashboard",
        icon: <DashboardOutlinedIcon />,
        linkTo: "/dashboard",
        text: "Dashboard",
      },
      {
        smallText: false,
        activePath: "/eventos",
        icon: <CelebrationOutlinedIcon />,
        linkTo: "/eventos",
        text: "Eventos",
      },
      {
        smallText: false,
        activePath: "/demandas",
        icon: <AssignmentOutlinedIcon />,
        linkTo: "/demandas",
        text: "Demandas",
      },
      {
        smallText: false,
        activePath: "/check-in",
        icon: <QrCodeIcon />,
        linkTo: "/check-in",
        text: "Check in",
      },
      {
        isSubMenu: true,
        label: "Equipe",
        icon: <GroupIcon />,
        items: [
          {
            activePath: "/formularios",
            linkTo: "/formularios",
            icon: <ArticleOutlinedIcon />,
            text: "Formulários",
            theme: "primary.lighter",
          },
          {
            activePath: "/parceiros",
            linkTo: "/parceiros",
            icon: <ContactsOutlinedIcon />,
            text: "Colaboradores",
            theme: "primary.lighter",
          },
        ],
      },
    ],
    colaborador: [
      {
        smallText: false,
        activePath: "/",
        icon: <HomeIcon />,
        linkTo: "/",
        text: "Home",
        sx: { mt: 2 },
      },
      {
        smallText: false,
        activePath: "/eventos-confirmados",
        icon: <CelebrationOutlinedIcon />,
        linkTo: "/eventos-confirmados",
        text: "Eventos",
        theme: "primary.lighter",
      },
      {
        smallText: false,
        activePath: "/convites",
        icon: <MailIcon />,
        linkTo: "/convites",
        text: "Convites",
        theme: "primary.lighter",
      },
    ],
  };

  const { tipoUsuario } = useUser();
  const showNav = !guestPages.includes(location.pathname) && !!tipoUsuario;

  const [titulo, setTitulo] = useState("");
  const [actions, setActions] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [dialogAction, setDialogAction] = useState(null);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const { collapsed } = useCollapsed();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <LayoutContext.Provider value={{ mobile }}>
      <ConfirmDialog
        action={dialogAction}
        content={dialogContent}
        open={openDialog}
        toggleDialog={toggleDialog}
      />
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <CssBaseline />
        {showNav && <Navbar />}
        <div className="app">
          {showNav && !mobile && <BarraLateral menuItems={menuItems} />}
          <Box
            sx={{
              overflow: showNav ? "scroll" : "hidden",
            }}
            p={showNav ? 2 : 0}
            style={{
              left: `${!mobile && showNav ? (collapsed ? 80 : 260) : 0}px`,
              width: `calc(100% - ${
                !mobile && showNav ? (collapsed ? 80 : 260) : 0
              }px)`,
              bgcolor: "#f0f0f0",
            }}
            className="content"
          >
            {titulo !== "" && (
              <Box mb={4}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                >
                  <Typography variant="h4" component="h4">
                    {titulo}
                  </Typography>
                  <ButtonGroup variant="contained" color="secondary">
                    {actions &&
                      actions.map((action, index) => {
                        return (
                          <Button
                            startIcon={action.icon}
                            key={index}
                            onClick={action.handleClick}
                          >
                            {action.label}
                          </Button>
                        );
                      })}
                  </ButtonGroup>
                </Box>
                <Breadcrumb />
              </Box>
            )}
            <Routes>
              <Route element={<GuestRoute />}>
                <Route
                  path="/login"
                  element={
                    <Login setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/cadastro"
                  element={
                    <Cadastro setTitulo={setTitulo} setActions={setActions} />
                  }
                />
              </Route>
              <Route
                element={
                  <ProtectedRoute allowedTypes={["parceiro", "colaborador"]} />
                }
              >
                <Route
                  path="/"
                  element={
                    <Home setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/configuracoes"
                  element={
                    <Configuracoes
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
              </Route>

              <Route element={<ProtectedRoute allowedTypes={["parceiro"]} />}>
                <Route
                  path="/"
                  element={
                    <Home setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/eventos"
                  element={
                    <Eventos setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/check-in"
                  element={
                    <CheckIn setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/check-in/:agendamentoId"
                  element={
                    <ConfirmarAgendamento
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/eventos/:recordId"
                  element={
                    <RegistroEvento
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/demandas/:recordId"
                  element={
                    <RegistroDemanda
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/usuarios/:userId"
                  element={
                    <PaginaUsuario
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/eventos/criar"
                  element={
                    <CriarEvento
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/demandas"
                  element={
                    <Demandas setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/demandas/criar"
                  element={
                    <CriarDemandas
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/escala"
                  element={
                    <Escala setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/formularios"
                  element={
                    <Formularios
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/formularios/:recordId"
                  element={
                    <RegistroFormulario
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/parceiros"
                  element={
                    <Parceiros setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="*"
                  element={
                    <NotFound setTitulo={setTitulo} setActions={setActions} />
                  }
                />
              </Route>

              <Route
                element={<ProtectedRoute allowedTypes={["colaborador"]} />}
              >
                <Route
                  path="/eventos-confirmados"
                  element={
                    <EventosConfirmados
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/eventos-pendentes"
                  element={
                    <EventosPendentes
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/eventos/buscar"
                  element={
                    <BuscarEventos
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
                <Route
                  path="/convites"
                  element={
                    <Convites setTitulo={setTitulo} setActions={setActions} />
                  }
                />
                <Route
                  path="/convites/:recordId"
                  element={
                    <RegistroConvite
                      toggleDialog={toggleDialog}
                      setDialogAction={setDialogAction}
                      setDialogContent={setDialogContent}
                      setTitulo={setTitulo}
                      setActions={setActions}
                    />
                  }
                />
              </Route>
            </Routes>
          </Box>
        </div>
        {showNav && mobile && <BottomNav menuItems={menuItems} />}
      </Box>
    </LayoutContext.Provider>
  );
};

export default Layout;
