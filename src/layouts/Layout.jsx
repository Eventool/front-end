import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  Typography,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BarraLateral from "../components/sidebar/BarraLateral";
import DemandasAbertas from "../pages/demandas/DemandasAbertas";
import DemandasFechadas from "../pages/demandas/DemandasFechadas";
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
import EventosAbertos from "../pages/eventos/EventosAbertos";
import EventosFechados from "../pages/eventos/EventosFechados";
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
import PaginaUsuario from "../pages/PáginaUsuario";
import Cadastro from "../pages/Cadastro";

const Layout = () => {
  // const [collapsed, setCollapsed] = useState(
  //     JSON.parse(localStorage.getItem('sidebarCollapsed')) || false
  // );

  // useEffect(() => {
  //     localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  // }, [collapsed]);

  const location = useLocation();

  useEffect(() => {}, [location]);

  const [titulo, setTitulo] = useState("");
  const [actions, setActions] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [dialogAction, setDialogAction] = useState(null);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const { collapsed } = useCollapsed();

  return (
    <>
      <ConfirmDialog
        action={dialogAction}
        content={dialogContent}
        open={openDialog}
        toggleDialog={toggleDialog}
      />
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <CssBaseline />
        {location.pathname !== "/login" &&
          location.pathname !== "/cadastro" && <Navbar />}
        <div className="app">
          {location.pathname !== "/login" &&
            location.pathname !== "/cadastro" && <BarraLateral />}
          <Box
            sx={{
              overflow:
                location.pathname !== "/login" &&
                location.pathname !== "/cadastro"
                  ? "scroll"
                  : "hidden",
            }}
            p={
              location.pathname !== "/login" &&
              location.pathname !== "/cadastro"
                ? 2
                : 0
            }
            style={{
              left: `${
                location.pathname !== "/login" &&
                location.pathname !== "/cadastro"
                  ? collapsed
                    ? 80
                    : 260
                  : 0
              }px`,
              width: `calc(100% - ${
                location.pathname !== "/login" &&
                location.pathname !== "/cadastro"
                  ? collapsed
                    ? 80
                    : 260
                  : 0
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
              </Route>
            </Routes>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Layout;
