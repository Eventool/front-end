import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampoTexto from "../../../components/input/CampoTexto";
import DataHora from "../../../components/input/DataHora";
import Picklist from "../../../components/input/Picklist";
import dayjs from "dayjs";

const DadosDemanda = ({
  responsaveis,
  eventos,
  handleDadosChange,
  dadosDemanda,
  setDadosDemanda,
  hasParams,
}) => {
  const handleTimeChange = (e, name) => {
    setDadosDemanda({
      ...dadosDemanda,
      [name]: e.format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  const handleEventoChange = (e, name) => {
    e.target.value = eventos.find((f) => f.id === e.target.value);
    handleDadosChange(e, name);
  };

  const handleResponsavelChange = (e, name) => {
    e.target.value = responsaveis.find((f) => f.id === e.target.value);
    handleDadosChange(e, name);
  };

  return (
    <>
      <Grid
        mb={2}
        mt={6}
        display={"flex"}
        justifyContent={"center"}
        width="100%"
        size={12}
      >
        <Typography variant="h5" component="h5">
          Dados da Demanda
        </Typography>
      </Grid>
      <Grid width="80%" margin="auto" container columnSpacing={2}>
        <CampoTexto
          size={12}
          handleChange={handleDadosChange}
          value={dadosDemanda.nome}
          name="nome"
          label="Nome"
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "inicio")}
          value={dadosDemanda.inicio != "" ? dayjs(dadosDemanda.inicio) : null}
          name="inicio"
          label="Início"
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "fim")}
          value={dadosDemanda.fim != "" ? dayjs(dadosDemanda.fim) : null}
          name="fim"
          label="Fim"
        />
        <Picklist
          itemParam="nome"
          disabled={hasParams}
          items={eventos}
          name="evento"
          label={"Evento"}
          handleChange={handleEventoChange}
          value={dadosDemanda.evento?.id}
        />
        <Picklist
          itemParam="nome"
          items={responsaveis}
          name="responsavel"
          label={"Coordenador"}
          handleChange={handleResponsavelChange}
          value={dadosDemanda.responsavel?.id}
        />
      </Grid>
    </>
  );
};

export default DadosDemanda;
