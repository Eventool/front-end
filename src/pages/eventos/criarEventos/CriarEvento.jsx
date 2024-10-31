import { useEffect, useState } from "react";
import Esteira from "../../../components/esteira/Esteira";
import Grid from "@mui/material/Grid2";
import PageModal from "../../../components/pageModal/PageModal";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Botao from "../../../components/btn/Botao";
import DadosEvento from "./DadosEvento";
import EventoEndereco from "./EventoEndereco";
import AbrirInscricoes from "./AbrirInscricoes";
import Finalizar from "./Finalizar";
import { getFormularios } from "../../../utils/dataMockUtil";
import { postEvento } from "../../../services/EventoService";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import { fetchData } from "../../../services/DataService";
import { useAlerta } from "../../../context/AlertaContext";

const CriarEvento = ({ setTitulo, setActions }) => {
  useEffect(() => {
    setTitulo("");
    setActions(null);
  });

  const navigate = useNavigate();
  const alerta = useAlerta();

  const [step, setStep] = useState(0);
  const labels = ["Evento", "Endereço", "Finalizar"];
  const qtdSteps = labels.length;

  const [loading, setLoading] = useState(false);

  const handleProximo = () => {
    if (step === qtdSteps - 1) handleConcluir();

    if (step > qtdSteps - 2) return;

    setStep(step + 1);
  };

  const handleConcluir = async () => {
    setLoading(true);

    const request = {
      ...dadosEvento,
      idFormulario: dadosEvento.formulario?.id,
      idResponsavel: dadosEvento.responsavel?.id,
    };

    try {
      const response = await postEvento(request, imagem);
      console.log(response);

      // if (status !== 201) {
      //   alerta.error("Não foi possível criar evento");
      //   return;
      // }

      // alerta.success("Evento criado com sucesso");
      // navigate(-1);
    } catch (err) {
      alerta.error("Não foi possível criar evento");
      console.error("Erro ao criar evento: " + err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnterior = () => {
    if (step <= 0) return;

    setStep(step - 1);
  };

  const [dadosEvento, setDadosEvento] = useState({
    nome: "",
    orcamento: "",
    inicio: "",
    fim: "",
    responsavel: {
      id: "",
      nome: "",
    },
    formulario: {
      id: "",
      nome: "",
    },
    endereco: {
      logradouro: "",
      cep: "",
      numero: "",
      uf: "",
      cidade: "",
    },
  });

  const [imagem, setImagem] = useState(null);

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setDadosEvento((prevState) => ({
      ...prevState,
      endereco: {
        ...prevState.endereco,
        [name]: value,
      },
    }));
  };

  const handleViaCEPResponse = ({ logradouro, uf, cidade }) => {
    setDadosEvento((prevState) => ({
      ...prevState,
      endereco: {
        ...prevState.endereco,
        logradouro: logradouro,
        uf: uf,
        cidade: cidade,
      },
    }));
  };

  const handleUfChange = (event, newValue) => {
    if (newValue) {
      setDadosEvento((prevState) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          uf: newValue.id,
        },
      }));
    }
  };

  const [formularios, setFormularios] = useState([]);

  const buscarFormularios = async () => {
    try {
      const data = await fetchData(`forms`);
      setFormularios(data);
    } catch (err) {
      console.error("Erro ao buscar formulários: " + err);
      alerta.error("Erro ao buscar formulários");
    }
  };

  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    const buscarResponsaveis = async () => {
      try {
        const data = await fetchData(`usuarios`);

        setResponsaveis(
          data
            .filter((user) => user.contato !== null)
            .map((user) => ({ ...user.contato, id: user.id }))
        );
      } catch (err) {
        console.log("Erro ao buscar evento: " + err);
        alerta.error("Erro ao buscar evento");
      }
    };
    buscarFormularios();
    buscarResponsaveis();
  }, []);

  const handleFormularioChange = (e) => {
    const formulario = formularios.find((f) => f.id === e.target.value);

    if (!formulario) {
      return;
    }

    setDadosEvento((prevState) => ({
      ...prevState,
      formulario: formulario,
    }));
  };

  const handleResponsavelChange = (e) => {
    const responsavel = responsaveis.find((f) => f.id === e.target.value);

    if (!responsavel) {
      return;
    }

    setDadosEvento((prevState) => ({
      ...prevState,
      responsavel: responsavel,
    }));
  };

  const handleDadosChange = (e, name) => {
    setDadosEvento({ ...dadosEvento, [name]: e.target.value });
  };

  return (
    <>
      <PageModal>
        <Backdrop
          open={loading}
          sx={(theme) => ({ zIndex: theme.zIndex.drawer + 2 })}
        >
          <CircularProgress />
        </Backdrop>
        <Typography variant="h4" component="h4">
          Criar Evento
        </Typography>
        <Box sx={{ mt: 1, mb: 3 }}>
          <Grid container width="80%" margin="auto" columnSpacing={10}>
            <Grid display={"flex"} justifyContent={"center"} size={12}>
              <Esteira setStep={setStep} step={step} labels={labels} />
            </Grid>
            {step === 0 && (
              <DadosEvento
                formularios={formularios}
                responsaveis={responsaveis}
                imagem={imagem}
                setImagem={setImagem}
                handleFormularioChange={handleFormularioChange}
                handleResponsavelChange={handleResponsavelChange}
                handleDadosChange={handleDadosChange}
                dadosEvento={dadosEvento}
                setDadosEvento={setDadosEvento}
              />
            )}

            {step === 1 && (
              <EventoEndereco
                handleViaCEPResponse={handleViaCEPResponse}
                dadosEvento={dadosEvento}
                handleEnderecoChange={handleEnderecoChange}
                handleUfChange={handleUfChange}
              />
            )}

            {step === 2 && <Finalizar dadosEvento={dadosEvento} />}

            {step === 3 && <AbrirInscricoes dadosEvento={dadosEvento} />}
          </Grid>
        </Box>
        <Box
          sx={{
            mt: "auto",
            alignSelf: "center",
            display: "flex",
            gap: 1,
            width: "40%",
          }}
        >
          <Botao
            onClick={step > 0 ? handleAnterior : () => navigate(-1)}
            sx={{ width: "100%", minWidth: 100 }}
            variant={step > 0 ? "outlined" : "contained"}
            color="primary"
            txt={step > 0 ? "Anterior" : "Cancelar"}
          />
          <Botao
            onClick={handleProximo}
            sx={{ width: "100%", minWidth: 100 }}
            txt={step < qtdSteps - 1 ? "Próximo" : "Criar Evento"}
          />
        </Box>
      </PageModal>
    </>
  );
};

export default CriarEvento;
