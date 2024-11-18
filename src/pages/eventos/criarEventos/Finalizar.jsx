import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import CampoRegistro from "../../../components/input/CampoRegistro";

const Finalizar = ({ dadosEvento, setDadosEvento }) => {
  return (
    <Grid mt={4} rowSpacing={2} columnSpacing={8} container width={"100%"}>
      <Grid size={12}>
        <Typography component={"h5"} variant="h5">
          Revisão
        </Typography>
      </Grid>
      <CampoRegistro size={12} label="Nome" value={dadosEvento.nome} />
      <CampoRegistro
        label="Coordenador"
        value={dadosEvento.responsavel?.nome}
      />
      <CampoRegistro
        startAdornment={"R$"}
        label="Orçamento"
        value={dadosEvento.orcamento}
      />
      <CampoRegistro
        label="Início"
        value={dayjs(dadosEvento.inicio).format("DD/MM/YYYY HH:mm")}
      />
      <CampoRegistro
        label="Fim"
        value={dayjs(dadosEvento.fim).format("DD/MM/YYYY HH:mm")}
      />
      <CampoRegistro label="Formulário" value={dadosEvento.formulario?.nome} />
      <CampoRegistro
        label="Logradouro"
        value={dadosEvento.endereco?.logradouro}
      />
      <CampoRegistro label="CEP" value={dadosEvento.endereco?.cep} />
      <CampoRegistro label="Número" value={dadosEvento.endereco?.numero} />
      <CampoRegistro label="Estado" value={dadosEvento.endereco?.uf} />
      <CampoRegistro label="Cidade" value={dadosEvento.endereco?.cidade} />
    </Grid>
  );
};

export default Finalizar;
