import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";

const Finalizar = ({ dadosDemanda, setDadosDemanda }) => {
  const calcularTotal = () => {
    let total = 0;
    dadosDemanda.escalas.forEach((escala) => {
      total += Number(escala.valor) * escala.qtdColaborador;
    });
    setDadosDemanda((prevDados) => ({
      ...prevDados,
      custoTotal: total.toFixed(2),
    }));
  };

  useEffect(() => {
    calcularTotal();
  }, []);

  return (
    <Grid mt={4} rowSpacing={4} columnSpacing={8} container width={"100%"}>
      <Grid size={12}>
        <Typography component={"h5"} variant="h5">
          Revisão
        </Typography>
      </Grid>
      <CampoTexto size={12} label="Nome" value={dadosDemanda.nome} />
      <CampoTexto
        label="Início"
        value={dayjs(dadosDemanda.inicio).format("DD/MM/YYYY HH:mm")}
      />
      <CampoTexto
        label="Fim"
        value={dayjs(dadosDemanda.fim).format("DD/MM/YYYY HH:mm")}
      />
      <CampoTexto
        label="Custo Estipulado"
        startAdornment="R$"
        value={(dadosDemanda.custoTotal + "").replace(".", ",")}
      />
      <CampoTexto label="Coordenador" value={dadosDemanda.responsavel?.nome} />
      <CampoTexto
        label="Tipo de Contrato"
        value={dadosDemanda.tipoContrato.value}
      />
      <CampoTexto label="Evento" value={dadosDemanda.evento.nome} />
    </Grid>
  );
};

export default Finalizar;

const CampoTexto = ({
  label,
  value,
  startAdornment,
  size = { sm: 12, md: 6 },
}) => {
  return (
    <Grid size={size}>
      <TextField
        fullWidth
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
            readOnly: true,
          },
        }}
        label={label}
        value={value}
        variant="standard"
        onChange={(e) => e.preventDefault()}
      />
    </Grid>
  );
};
