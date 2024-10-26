import { useEffect, useState } from "react";
import PageModal from "../../../components/pageModal/PageModal";
import { Box, Typography } from "@mui/material";
import Botao from "../../../components/btn/Botao";
import Grid from "@mui/material/Grid2";
import Esteira from "../../../components/esteira/Esteira";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DadosDemanda from "./DadosDemanda";
import CadastrarEscalas from "./CadastrarEscalas";
import TipoContrato from "./TipoContrato";
import Finalizar from "./Finalizar";
import { fetchData, postData } from "../../../services/DataService";
import { useAlerta } from "../../../context/AlertaContext";

const CriarDemandas = ({ setTitulo, setActions }) => {
  const navigate = useNavigate();
  const { showAlerta } = useAlerta();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

  const [step, setStep] = useState(0);
  const labels = ["Demanda", "Escalas", "Contrato", "Finalizar"];
  const qtdSteps = labels.length;

  const handleProximo = () => {
    if (step === qtdSteps - 1) handleConcluir();

    if (step > qtdSteps - 2) return;

    setStep(step + 1);
  };

  const handleConcluir = async () => {
    const request = {
      ...dadosDemanda,
      idEvento: dadosDemanda.evento.id,
      idResponsavel: dadosDemanda.responsavel.id,
      tipoContrato: dadosDemanda.tipoContrato.id,
    };

    const response = await postData("demandas", request);

    if (response.error) {
      console.error(response.data);
      showAlerta("Não foi possível criar demanda.", "error");
      return;
    }

    showAlerta(`Demanda ${response.nome} criada com sucesso`);
    navigate("/demandas");
  };

  const handleAnterior = () => {
    if (step <= 0) return;

    setStep(step - 1);
  };

  const [dadosDemanda, setDadosDemanda] = useState({
    nome: "",
    inicio: "",
    fim: "",
    custoTotal: 0,
    responsavel: {
      id: "",
      nome: "",
    },
    tipoContrato: {
      id: "",
      value: "",
      documentosObrigatorios: [],
    },
    documentosAdicionados: [],
    evento: {
      id: "",
      value: "",
    },
    escalas: [],
  });

  const adicionarEscala = (novaEscala) => {
    novaEscala = {
      ...novaEscala,
      valor: Number(novaEscala.valor.replaceAll(".", "").replace(",", ".")),
    };

    setDadosDemanda((prevState) => ({
      ...prevState,
      escalas: [...prevState.escalas, novaEscala],
    }));
  };

  const handleDadosChange = (e, name) => {
    setDadosDemanda({ ...dadosDemanda, [name]: e.target.value });
  };

  useEffect(() => {
    setTitulo("");
    setActions(null);
  });

  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    const buscarEvento = async () => {
      try {
        const data = await fetchData(`eventos`);
        setEventos(data);
      } catch (err) {
        console.log("Erro ao buscar evento: " + err);
        showAlerta("Erro ao buscar evento", "error");
      }
    };

    buscarEvento();
  }, []);

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
        showAlerta("Erro ao buscar evento", "error");
      }
    };

    buscarResponsaveis();
  }, [showAlerta]);

  useEffect(() => {
    if (!eventId) return;

    setDadosDemanda((prevState) => ({
      ...prevState,
      evento: eventos.find((evento) => evento.id === eventId),
    }));
  }, [eventId, eventos]);

  return (
    <>
      <PageModal>
        <Typography variant="h4" component="h4">
          Criar Demanda
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Grid container width="80%" margin="auto" columnSpacing={10}>
            <Grid display={"flex"} justifyContent={"center"} size={12}>
              <Esteira setStep={setStep} step={step} labels={labels} />
            </Grid>
            {step === 0 && (
              <DadosDemanda
                responsaveis={responsaveis}
                eventos={eventos}
                hasParams={eventId != null}
                handleDadosChange={handleDadosChange}
                dadosDemanda={dadosDemanda}
                setDadosDemanda={setDadosDemanda}
              />
            )}

            {step === 1 && (
              <CadastrarEscalas
                setDadosDemanda={setDadosDemanda}
                dadosDemanda={dadosDemanda}
                adicionarEscala={adicionarEscala}
              />
            )}

            {step === 2 && (
              <TipoContrato
                dadosDemanda={dadosDemanda}
                handleDadosChange={handleDadosChange}
              />
            )}

            {step === 3 && (
              <Finalizar
                dadosDemanda={dadosDemanda}
                setDadosDemanda={setDadosDemanda}
              />
            )}
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
            txt={step < qtdSteps - 1 ? "Próximo" : "Concluir"}
          />
        </Box>
      </PageModal>
    </>
  );
};

export default CriarDemandas;
