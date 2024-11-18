import { Box, FormControl, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Picklist from "../../../components/input/Picklist";
import CampoTexto from "../../../components/input/CampoTexto";
import Botao from "../../../components/btn/Botao";
import PillContainer from "../../../components/pill/Pill";
import { funcoesAlocacao } from "../../../utils/dataMockUtil";
import { useState } from "react";
import OutlinedBox from "../../../components/box/OutlinedBox";

const CriarEscalas = ({ dadosDemanda, setDadosDemanda, adicionarEscala }) => {
  const setEscalas = (escala) => {
    setDadosDemanda({ ...dadosDemanda, escalas: escala });
  };

  const [escalaAtual, setEscalaAtual] = useState({
    funcao: {
      id: "",
      value: "",
    },
    qtdColaborador: "",
    horasJornada: "",
    valor: "",
  });

  const handleChange = (e, name) => {
    setEscalaAtual({ ...escalaAtual, [name]: e.target.value });
  };

  const handleFuncaoEscalaChange = (e) => {
    const funcao = funcoesAlocacao.filter((f) => f.id === e.target.value)[0];
    setEscalaAtual({ ...escalaAtual, funcao: funcao });
  };

  const cadastrarEscala = () => {
    const escalas = dadosDemanda.escalas;

    const novaEscala = {
      id: escalas.length > 0 ? escalas[escalas.length - 1].id + 1 : 0,
      funcao: escalaAtual.funcao,
      qtdColaborador: escalaAtual.qtdColaborador,
      horasJornada: escalaAtual.horasJornada,
      valor: escalaAtual.valor,
    };

    const campoVazio = Object.keys(novaEscala).some((key) => {
      return novaEscala[key] === "";
    });

    if (campoVazio) return;

    adicionarEscala(novaEscala);

    setEscalaAtual({
      funcao: {
        id: "",
        value: "",
      },
      qtdColaborador: "",
      horasJornada: "",
      valor: "",
    });
  };

  return (
    <>
      <Grid
        mt={4}
        alignItems={"center"}
        container
        flexDirection={"column"}
        size={{ sm: 12, md: 6 }}
      >
        <Typography mb={4} variant="h5" component="h5">
          Cadastrar Escala
        </Typography>
        <FormControl
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Picklist
            size={12}
            label={"Função"}
            name={"funcao"}
            value={escalaAtual.funcao.id}
            handleChange={handleFuncaoEscalaChange}
            items={funcoesAlocacao}
          />
          <CampoTexto
            size={12}
            handleChange={handleChange}
            mascara="numeroPositivo"
            name="qtdColaborador"
            value={escalaAtual.qtdColaborador}
            label="Qtd Colaboradores"
            textSize={{ min: 0, max: 48 }}
          />
          <CampoTexto
            size={12}
            handleChange={handleChange}
            mascara="numeroPositivo"
            name="horasJornada"
            value={escalaAtual.horasJornada}
            label="Horas da Jornada"
            textSize={{ min: 0, max: 48 }}
          />
          <CampoTexto
            size={12}
            handleChange={handleChange}
            mascara="dinheiro"
            name="valor"
            value={escalaAtual.valor}
            startAdornment="R$"
            textSize={{ min: 0, max: 48 }}
            label="Valor"
          />
          <Botao
            sx={{ mt: 2 }}
            txt="Inserir Escala"
            onClick={cadastrarEscala}
          />
        </FormControl>
      </Grid>
      <Grid mt={4} size={{ sm: 12, md: 6 }}>
        <OutlinedBox>
          <Typography
            width={"100%"}
            textAlign={"center"}
            mb={6}
            variant="h5"
            component="h5"
          >
            Escalas Cadastradas
          </Typography>
          <PillContainer setPills={setEscalas} pills={dadosDemanda.escalas} />
        </OutlinedBox>
      </Grid>
    </>
  );
};

export default CriarEscalas;
