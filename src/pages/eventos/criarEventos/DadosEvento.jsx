import { Typography, FormControl, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampoTexto from "../../../components/input/CampoTexto";
import DataHora from "../../../components/input/DataHora";
import axios from "axios";
import Picklist from "../../../components/input/Picklist";
import dayjs from "dayjs";
import { getUsuarios } from "../../../utils/dataMockUtil";
import InputFile from "../../../components/input/InputFile";
import BlockIcon from "@mui/icons-material/Block";
import { useAlerta } from "../../../context/AlertaContext";
import { useEffect, useRef } from "react";

const DadosEvento = ({
  responsaveis,
  formularios,
  handleDadosChange,
  dadosEvento,
  setDadosEvento,
  handleFormularioChange,
  handleResponsavelChange,
  imagem,
  setImagem,
  handleErros,
  erros,
}) => {
  const handleTimeChange = (e, name) => {
    setDadosEvento({ ...dadosEvento, [name]: e.format("YYYY-MM-DDTHH:mm:ss") });
  };

  const alerta = useAlerta();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alerta.error(`Arquivo ${file.name} não permitido`, "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alerta.error(`Arquivo muito grande. Tamanho máximo: 5MB`, "error");
      return;
    }

    setImagem(file);
  };

  const handleDelete = () => {
    setImagem(null);
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
          Dados do Evento
        </Typography>
      </Grid>
      <Grid width="80%" margin="auto" container columnSpacing={2}>
        <CampoTexto
          size={12}
          handleChange={handleDadosChange}
          value={dadosEvento.nome}
          name="nome"
          label="Nome"
          handleErros={handleErros}
          required
          inputRef={inputRef}
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "inicio")}
          value={dadosEvento.inicio != "" ? dayjs(dadosEvento.inicio) : null}
          name="inicio"
          label="Início"
          erros={erros}
          handleErros={handleErros}
          errorMsg="O início não pode ser anterior ao presente."
        />
        <DataHora
          handleChange={(e) => handleTimeChange(e, "fim")}
          value={dadosEvento.fim != "" ? dayjs(dadosEvento.fim) : null}
          minDateTime={dayjs(dadosEvento.inicio)}
          name="fim"
          label="Fim"
          erros={erros}
          handleErros={handleErros}
          errorMsg="O fim não pode ser anterior ao início."
        />
        <CampoTexto
          handleChange={handleDadosChange}
          value={dadosEvento.orcamento}
          startAdornment="R$"
          mascara="dinheiro"
          name="orcamento"
          handleErros={handleErros}
          label="Orçamento"
        />
        <Picklist
          itemParam="nome"
          items={responsaveis}
          handleChange={handleResponsavelChange}
          value={dadosEvento.responsavel?.id}
          name="formulario"
          label="Coordenador"
        />
        <Picklist
          itemParam="nome"
          items={formularios}
          name="formulario"
          label={"Formulário"}
          handleChange={handleFormularioChange}
          value={dadosEvento.formulario?.id}
        />
        <InputFile
          handleFileChange={handleFileChange}
          handleDelete={handleDelete}
          imagem={imagem}
        />
      </Grid>
    </>
  );
};

export default DadosEvento;
