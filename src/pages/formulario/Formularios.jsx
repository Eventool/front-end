import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CachedIcon from "@mui/icons-material/Cached";
import { getFormularios } from "../../utils/dataMockUtil";
import Botao from "../../components/btn/Botao";
import { useNavigate } from "react-router-dom";
import {
  deleteData,
  fetchData,
  postData,
  putData,
} from "../../services/DataService";
import { useAlerta } from "../../context/AlertaContext";
import { useLayout } from "../../layouts/Layout";

const Formularios = () => {
  const {
    setTitulo,
    setActions,
    toggleDialog,
    setDialogContent,
    setDialogAction,
  } = useLayout();
  const theme = useTheme();
  const alerta = useAlerta();

  useEffect(() => {
    setTitulo("Formulários");
  }, []);

  const [formularios, setFormularios] = useState([]);

  const [editarDialogOpen, setEditarDialogOpen] = useState(false);
  const [formulario, setFormulario] = useState({});

  const [novoDialogOpen, setNovoDialogOpen] = useState(false);
  const [novoFormulario, setNovoFormulario] = useState({});
  const [isIntegrationLoading, setIsIntegrationLoading] = useState(false);

  useEffect(() => {
    const actions = [
      {
        label: "Atualizar",
        handleClick: () => {
          handleIntegrarFormularios();
        },
        icon: <CachedIcon />,
        isLoading: isIntegrationLoading,
      },
    ];

    setActions(actions);
  }, [setActions, formulario, novoFormulario, isIntegrationLoading]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(`forms`);

      if (response.error) {
        alerta.error("Erro ao buscar formulários");
        return;
      }

      setFormularios(response);
    })();
  }, [setFormularios, alerta]);

  const handleIntegrarFormularios = async () => {
    setIsIntegrationLoading(true);

    const response = await postData(`forms/google`);

    if (response.error) {
      alerta.error("Erro ao atualizar formulários");
      return;
    }

    alerta.success("Formulários atualizados com sucesso");

    setFormularios(response);
    setIsIntegrationLoading(false);
  };

  const openEditarDialog = (formulario) => {
    setFormulario(formulario);
    setEditarDialogOpen(true);
  };

  const closeEditarDialog = () => {
    setEditarDialogOpen(false);
  };

  const handleEditarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleEditarFormularios = async (novoFormularioAtualizado) => {
    const response = await putData(
      "forms",
      novoFormularioAtualizado,
      novoFormularioAtualizado.id
    );

    if (response.error) {
      console.error(response);
      return;
    }

    alerta.success("Formulário atualizado com sucesso.");
    closeEditarDialog();
  };

  const closeNovoDialog = () => {
    setNovoDialogOpen(false);
  };

  const handleNovoFormulario = (e) => {
    setNovoFormulario({ ...novoFormulario, [e.target.name]: e.target.value });
  };

  const handleCriarFormulario = async () => {
    const response = await postData("forms", novoFormulario);

    if (response.error) {
      alerta.error("Erro ao criar formulário.");
      return;
    }

    alerta.success("Formulário criado com sucesso.");
    closeNovoDialog();
  };

  return (
    <>
      <EditarDialog
        formulario={formulario}
        closeEditarDialog={closeEditarDialog}
        handleEditarFormularios={() => handleEditarFormularios(formulario)}
        open={editarDialogOpen}
        handleEditarFormulario={handleEditarFormulario}
      />
      <NovoDialog
        closeNovoDialog={closeNovoDialog}
        open={novoDialogOpen}
        handleNovoFormulario={handleNovoFormulario}
        handleCriarFormulario={handleCriarFormulario}
      />
      <Box className="flexColumn" gap={2}>
        {formularios &&
          formularios.map((formulario, index) => {
            return (
              <CardFormulario
                key={index}
                theme={theme}
                formulario={formulario}
                openEditarDialog={openEditarDialog}
                toggleDialog={toggleDialog}
                setDialogAction={setDialogAction}
                setDialogContent={setDialogContent}
                setTitulo={setTitulo}
                setActions={setActions}
                alerta={alerta}
              />
            );
          })}
      </Box>
    </>
  );
};

const CardFormulario = ({
  formulario,
  theme,
  openEditarDialog,
  toggleDialog,
  setDialogContent,
  setDialogAction,
  alerta,
}) => {
  const navigate = useNavigate();

  const handleCopyClick = (formulario) => {
    navigator.clipboard.writeText(formulario.url);
    alerta.success(
      `Link para formulário ${formulario.nome} copiado para área de transferência`
    );
  };

  const handleClick = () => {
    navigate("/formularios/" + formulario.id);
  };

  const handleDeletar = async () => {
    setDialogContent({
      title: "Deseja excluir?",
      body: (
        <>
          O objeto <b>{formulario.nome}</b> será excluido permanentemente
        </>
      ),
    });

    setDialogAction(() => async () => {
      const response = await deleteData("forms", formulario.id);

      if (response.error) {
        alerta.error("Erro ao excluir objeto", "error");
        return;
      }

      alerta.success(`Formulário ${formulario.nome} excluido com sucesso`);
    });

    toggleDialog();
  };

  return (
    <Box
      bgcolor={theme.palette.white.main}
      p={2}
      borderRadius={3}
      className="flexRowBetween"
    >
      <Box className="flexRowCenter" gap={2}>
        <Typography
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
          role="button"
          tabIndex={0}
          sx={{
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => handleClick()}
          fontSize={16}
        >
          {formulario.nome}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography fontSize={14} color="#5e5e5e">
          {formulario.url}
        </Typography>
      </Box>
      <Box className="flexRowCenter" gap={3}>
        <ButtonGroup color="primary" variant="text">
          <Tooltip title="Compartilhar link">
            <Button onClick={() => {}}>
              <ShareIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button onClick={handleDeletar}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

const EditarDialog = ({
  closeEditarDialog,
  open,
  formulario,
  handleEditarFormulario,
  handleEditarFormularios,
}) => {
  return (
    <Dialog open={open} onClose={closeEditarDialog}>
      <DialogTitle>Editar Formulário</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleEditarFormulario}
          margin="dense"
          name="nome"
          value={formulario.nome}
          label="Nome"
          variant="standard"
          fullWidth
        />
        <TextField
          onChange={handleEditarFormulario}
          margin="dense"
          name="url"
          value={formulario.url}
          label="Link"
          variant="standard"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Botao
          onClick={closeEditarDialog}
          variant="outlined"
          color="primary"
          txt="Cancelar"
        />
        <Botao onClick={handleEditarFormularios} txt="Confirmar" />
      </DialogActions>
    </Dialog>
  );
};

const NovoDialog = ({
  closeNovoDialog,
  open,
  handleNovoFormulario,
  handleCriarFormulario,
}) => {
  return (
    <Dialog open={open} onClose={closeNovoDialog}>
      <DialogTitle>Novo Formulário</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleNovoFormulario}
          margin="dense"
          name="nome"
          label="Nome"
          variant="standard"
          fullWidth
        />
        <TextField
          onChange={handleNovoFormulario}
          margin="dense"
          name="url"
          label="Link"
          variant="standard"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Botao
          onClick={closeNovoDialog}
          variant="outlined"
          color="primary"
          txt="Cancelar"
        />
        <Botao onClick={handleCriarFormulario} txt="Confirmar" />
      </DialogActions>
    </Dialog>
  );
};

export default Formularios;
