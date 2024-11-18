import { useEffect, useState } from "react";
import PageModal from "../components/pageModal/PageModal";
import Imagem from "../components/imagem/Imagem";
import { deleteData, fetchData, putData } from "../services/DataService";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@emotion/react";
import { aplicarMascara, getNestedValue } from "../utils/util";
import dayjs from "dayjs";
import OutlinedBox from "../components/box/OutlinedBox";
import Mapa from "../mapa/Mapa";
import CampoRegistro from "../components/input/CampoRegistro";
import Tabela from "../components/tabela/Tabela";
import DataHora from "../components/input/DataHora";
import FloatingBotao from "../components/btn/FloatingBotao";
import { useAlerta } from "../context/AlertaContext";

const Registro = ({
  setTitulo = () => {},
  setActions = () => {},
  toggleDialog,
  setDialogContent,
  setDialogAction,
  struct,
}) => {
  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, []);

  const { recordId } = useParams();
  const navigate = useNavigate();
  const alerta = useAlerta();

  const [objeto, setObjeto] = useState(null);
  const [objetoEditado, setObjetoEditado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const guias = ["Detalhes", "Demandas", "Escalas"];
  const [guia, setGuia] = useState(guias[0]);

  const [erros, setErros] = useState([]);
  const [podeAvancar, setAvancar] = useState(false);

  const handleErros = (e) => {
    console.log(erros);
    setErros((prevState) => ({
      ...prevState,
      [e.name]: e.value,
    }));
  };

  useEffect(() => {
    setAvancar(() => {
      const campos = Object.keys(erros);
      for (let i = 0; i < campos.length; i++) {
        if (erros[campos[i]]) {
          return true;
        }
      }

      return false;
    });
  }, [erros]);

  const handleEditarObjeto = () => {
    setEditando(true);
  };

  const handleCampoChange = (e, name) => {
    setObjetoEditado({ ...objetoEditado, [name]: e.target.value });
  };

  const handleAutocompleteChange = (event, newValue, value) => {
    const [a, b] = value.split(".");

    if (newValue && b) {
      setObjetoEditado((prevState) => ({
        ...prevState,
        [a]: {
          ...prevState[a],
          [b]: newValue.id,
        },
      }));
    }
  };

  const handleSalvar = async () => {
    const request = { ...objetoEditado };

    const response = await putData(struct.object.resource, request, objeto.id);

    if (response.error) {
      alerta.error("Erro ao atualizar objeto");
      return;
    }

    setObjeto({ ...response });
    setEditando(false);
    alerta.success(`Objeto ${response.nome} atualizado com sucesso`);
  };

  const handleCancelar = () => {
    setObjetoEditado({ ...objeto });
    setEditando(false);
  };

  const handleEnderecoChange = (e, name, obj) => {
    let novoEndereco = objetoEditado[obj];
    novoEndereco = { ...novoEndereco, [name]: e.target.value };
    setObjetoEditado({ ...objetoEditado, endereco: novoEndereco });
  };

  const handleTimeChange = (e, name) => {
    setObjetoEditado({
      ...objetoEditado,
      [name]: e.format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  useEffect(() => {
    const buscarObjeto = async () => {
      const data = await fetchData(`${struct.object.resource}/${recordId}`);

      if (data.error) {
        setTimeout(() => {
          alerta.error("Erro ao buscar objeto");
          setLoading(false);
          navigate("/", struct.object.resource);
        }, 1000);
      }

      setObjeto(data);
      setObjetoEditado(data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    buscarObjeto();
  }, [struct]);

  const handleDeletar = async () => {
    setDialogContent({
      title: "Deseja excluir?",
      body: (
        <>
          O objeto <b>{objeto.nome}</b> será excluido permanentemente
        </>
      ),
    });

    setDialogAction(() => async () => {
      const { status } = await deleteData(objeto.id);

      if (status !== 204) {
        alerta.error("Erro ao excluir objeto", "error");
        return;
      }

      alerta.success("Objeto excluido com sucesso");

      navigate("/", struct.object.resource);
    });

    toggleDialog();
  };

  const handleConfirmarVoltar = async () => {
    setDialogContent({
      title: "Deseja voltar?",
      body: <>As alterações não serão salvas</>,
    });

    setDialogAction(() => async () => {
      navigate(-1);
    });

    toggleDialog();
  };

  return (
    <PageModal>
      <Backdrop
        open={loading}
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 2 })}
      >
        <CircularProgress />
      </Backdrop>
      {!loading && (
        <Box mb={1} className="flexRowBetween">
          <Box className="flexRowCenter" gap={1}>
            <ButtonBase
              onClick={() => {
                editando ? handleConfirmarVoltar() : navigate(-1);
              }}
              disableRipple
              sx={{ borderRadius: "50%", p: "8px" }}
            >
              <ArrowBackIosIcon fontSize="32px" />
            </ButtonBase>
            <Typography variant="h6">{struct.object.name}</Typography>
          </Box>
        </Box>
      )}
      {!loading && objeto && (
        <>
          <Box
            sx={(theme) => ({
              position: "sticky",
              top: -16,
              zIndex: theme.zIndex.drawer + 1,
              bgcolor: "#ffffff",
            })}
          >
            <Box
              mb={3}
              p={1}
              className="flexRowBetween"
              sx={{ alignItems: "flex-end" }}
            >
              <Box className="flexRowCenter">
                <Typography variant="h5">{objeto.nome}</Typography>
              </Box>
              <Box className="flexRowStart" sx={{ gap: 10 }}>
                {struct.header.fields.map((item, index) => {
                  return (
                    <Box key={index} className="flexColumnStart">
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography title={item.name} variant="h6">
                        <>
                          {(() => {
                            const value = getNestedValue(objeto, item.value);

                            switch (item.type) {
                              case "text":
                                return value;
                              case "statusChip":
                                return (
                                  <Chip
                                    title={value}
                                    color={
                                      value !== "Em andamento"
                                        ? "secondary"
                                        : "primary"
                                    }
                                    variant={
                                      value === "Não iniciado"
                                        ? "outlined"
                                        : "filled"
                                    }
                                    label={
                                      <Typography variant="subtitle1">
                                        {value}
                                      </Typography>
                                    }
                                  />
                                );
                              case "currency":
                                return (
                                  <>
                                    <small>R$ </small>
                                    {aplicarMascara(
                                      value.toFixed(2),
                                      "dinheiro"
                                    )}
                                  </>
                                );
                              case "date":
                                return dayjs(value).format("DD/MM/YYYY HH:mm");

                              default:
                                break;
                            }
                          })()}
                        </>
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box className="flexRowCenter" gap={1}>
                <Button
                  disabled={editando}
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                  onClick={handleEditarObjeto}
                >
                  Editar
                </Button>
                <Button
                  disabled={editando}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeletar}
                >
                  Excluir
                </Button>
              </Box>
            </Box>
            <Divider />
          </Box>
          {struct.image && (
            <Box className="flexRowBetween">
              <Imagem
                imagem={objetoEditado.imagem}
                placeholder={struct.image.placeholder}
              />
            </Box>
          )}
          <Box>
            <Guias
              guiaAtual={guia}
              guias={struct.tabs}
              setGuia={setGuia}
              guiaActions={struct.tabsAction}
              objeto={objeto}
            />

            <OutlinedBox sx={{ mt: 3 }}>
              <Box>
                <Grid container rowGap={3} columnSpacing={2}>
                  {struct.tabs.map((tab) => {
                    if (tab.name !== guia) return;

                    return tab.sections.map((section, index) => {
                      if (section.columns)
                        return (
                          <Grid key={index} size={12}>
                            <Tabela
                              columns={section.columns}
                              rows={objeto[section.rowsValue]}
                            />
                          </Grid>
                        );

                      if (section.fields)
                        return (
                          <>
                            <Grid container rowGap={3} columnSpacing={2}>
                              <Grid size={12}>
                                <Typography
                                  key={index}
                                  variant="h6"
                                  component="h6"
                                >
                                  {section.name}
                                </Typography>
                              </Grid>

                              {section.fields.map((field, index) => {
                                let value = getNestedValue(
                                  objetoEditado,
                                  field.value
                                );

                                switch (field.type) {
                                  case "dinheiro":
                                    return (
                                      <CampoRegistro
                                        handleErros={handleErros}
                                        key={index}
                                        editando={editando}
                                        handleChange={handleCampoChange}
                                        name={field.name}
                                        label={field.label}
                                        startAdornment={"R$"}
                                        mascara={
                                          editando ? "numero" : "dinheiro"
                                        }
                                        errorMsg={field.errorMsg}
                                        value={aplicarMascara(
                                          value,
                                          "dinheiro"
                                        )}
                                      />
                                    );

                                  case "date":
                                    return (
                                      (editando && (
                                        <DataHora
                                          minDateTime={dayjs(
                                            objetoEditado[field.minDateTime]
                                          )}
                                          handleErros={handleErros}
                                          key={index}
                                          editando={editando}
                                          handleChange={(e) =>
                                            handleTimeChange(e, field.name)
                                          }
                                          name={field.name}
                                          label={field.label}
                                          value={dayjs(value)}
                                          errorMsg={field.errorMsg}
                                          erros={erros}
                                        />
                                      )) ||
                                      (!editando && (
                                        <CampoRegistro
                                          key={index}
                                          editando={editando}
                                          handleChange={handleCampoChange}
                                          name={field.name}
                                          label={field.label}
                                          value={dayjs(value).format(
                                            "DD/MM/YYYY HH:mm"
                                          )}
                                        />
                                      ))
                                    );

                                  case "picklist":
                                    return (
                                      (editando && (
                                        <Grid size={6} key={index} mt={2}>
                                          <Autocomplete
                                            disablePortal
                                            options={field.options}
                                            getOptionLabel={(option) =>
                                              option.value
                                            }
                                            value={
                                              field.options.find(
                                                (estado) => estado.id === value
                                              ) || null
                                            }
                                            onChange={(event, newValue) =>
                                              handleAutocompleteChange(
                                                event,
                                                newValue,
                                                field.value
                                              )
                                            }
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label={field.label}
                                              />
                                            )}
                                          />
                                        </Grid>
                                      )) ||
                                      (!editando && (
                                        <CampoRegistro
                                          key={index}
                                          editando={editando}
                                          name={field.name}
                                          label={field.label}
                                          value={value}
                                        />
                                      ))
                                    );
                                  case "mapa":
                                    return (
                                      <Box
                                        width="100%"
                                        className="flexRowCenter"
                                        key={index}
                                      >
                                        <Mapa endereco={objeto[field.value]} />
                                      </Box>
                                    );
                                  default:
                                    return (
                                      <CampoRegistro
                                        handleErros={handleErros}
                                        key={index}
                                        editando={editando}
                                        imutavel={field.immutable}
                                        handleChange={
                                          section.nested
                                            ? (e) =>
                                                handleEnderecoChange(
                                                  e,
                                                  e.target.name,
                                                  section.value
                                                )
                                            : (e) =>
                                                handleCampoChange(
                                                  e,
                                                  e.target.name
                                                )
                                        }
                                        name={field.name}
                                        label={field.label}
                                        value={value}
                                        errorMsg={field.errorMsg}
                                      />
                                    );
                                }
                              })}
                            </Grid>
                          </>
                        );
                    });
                  })}
                </Grid>
                <Box className="flexRowCenter" mt={3}></Box>
              </Box>
            </OutlinedBox>
          </Box>
        </>
      )}

      {editando && (
        <FloatingBotao
          podeAvancar={podeAvancar}
          handleSalvar={handleSalvar}
          handleCancelar={handleCancelar}
        />
      )}
    </PageModal>
  );
};

const Guias = ({ guias, guiaAtual, setGuia, guiaActions, objeto }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box className="flexRowBetween">
      <Box
        mt={2}
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${guias.length}, 1fr)`,
          width: "30%",
        }}
        gap={5}
      >
        {guias &&
          guias.map(({ name }, index) => {
            return (
              <ButtonBase
                disableRipple
                onClick={() => setGuia(name)}
                sx={{
                  borderBottom: `2px solid ${
                    guiaAtual === name ? theme.palette.secondary.main : null
                  }`,
                  pb: "4px",
                }}
                key={index}
              >
                <Typography>{name}</Typography>
              </ButtonBase>
            );
          })}
      </Box>

      {guiaActions && (
        <ButtonGroup
          variant="contained"
          color="secondary"
          sx={{ alignSelf: "flex-end", mr: 2 }}
        >
          {guiaActions.map((item, index) => {
            let action;

            switch (item.type) {
              case "navigate":
                action = () => navigate(`${item.action}${objeto.id}`);
                break;
              case "function":
                action = item.action;
                break;

              default:
                action = () => {};
                break;
            }

            return (
              item.id === guiaAtual && (
                <Button startIcon={item.icon} key={index} onClick={action}>
                  {item.label}
                </Button>
              )
            );
          })}
        </ButtonGroup>
      )}
    </Box>
  );
};

export default Registro;
