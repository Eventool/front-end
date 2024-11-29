import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampoTexto from "../../../components/input/CampoTexto";
import DataHora from "../../../components/input/DataHora";
import Picklist from "../../../components/input/Picklist";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

const DadosDemanda = ({
  responsaveis,
  eventos,
  handleDadosChange,
  dadosDemanda,
  setDadosDemanda,
  hasParams,
  handleErros,
  erros,
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

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          required
          size={12}
          handleChange={handleDadosChange}
          value={dadosDemanda.nome}
          name="nome"
          label="Nome"
          handleErros={handleErros}
          inputRef={inputRef}
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "inicio")}
          value={dadosDemanda.inicio != "" ? dayjs(dadosDemanda.inicio) : null}
          name="inicio"
          label="Início"
          erros={erros}
          handleErros={handleErros}
          errorMsg="O início não pode ser anterior ao presente."
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "fim")}
          value={dadosDemanda.fim != "" ? dayjs(dadosDemanda.fim) : null}
          name="fim"
          label="Fim"
          erros={erros}
          handleErros={handleErros}
          errorMsg="O fim não pode ser anterior ao início."
        />
        <Picklist
          required
          itemParam="nome"
          disabled={hasParams}
          items={eventos}
          name="evento"
          label={"Evento"}
          handleChange={handleEventoChange}
          value={dadosDemanda.evento?.id}
        />
        <Picklist
          required
          itemParam="nome"
          items={responsaveis}
          name="responsavel"
          label={"Coordenador"}
          handleErros={handleErros}
          handleChange={handleResponsavelChange}
          value={dadosDemanda.responsavel?.id}
        />
      </Grid>
    </>
  );
};

export default DadosDemanda;
