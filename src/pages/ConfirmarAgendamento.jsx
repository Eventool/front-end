import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../services/DataService";
import { useAlerta } from "../context/AlertaContext";
import { Box, Grid2, Rating, TextField, Typography } from "@mui/material";
import PageModal from "../components/pageModal/PageModal";
import dayjs from "dayjs";

const ConfirmarAgendamento = ({ setTitulo, setActions }) => {
  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, []);

  const { agendamentoId } = useParams();
  const alerta = useAlerta();
  const [agendamento, setAgendamento] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData("agendamentos/" + agendamentoId);

      if (response.error) {
        alerta.error("Erro ao buscar agendamento");
        return;
      }

      console.log(response);

      setAgendamento(response);
    })();
  }, [agendamentoId]);

  return (
    <PageModal>
      <Grid2 container columnSpacing={2}>
        <Grid2 item size={4}>
          <Box className="flexColumnCenter">
            <Box width="60%">
              <img width="100%" src="https://via.placeholder.com/150" />
            </Box>
            <Rating defaultValue={4} precision={0.5} readOnly />
            <Typography>Detalhes do agendamento </Typography>
          </Box>
        </Grid2>
        <Grid2 item size={8}>
          <Box width="80%" margin="auto">
            <Typography variant="h5" fontWeight="bold">
              {agendamento.usuario.contato.nome}
            </Typography>
            <Typography variant="body2">{agendamento.usuario.email}</Typography>
            <Grid2 mt={5} container spacing={2}>
              <Grid2 item size={6}>
                <TextField
                  label="Nome"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.usuario.contato.nome}
                />
                <TextField
                  label="Email"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.usuario.email}
                />
                <TextField
                  label="Idade"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={dayjs().diff(
                    dayjs(agendamento.usuario.contato.dataNascimento),
                    "year"
                  )}
                />
                <TextField
                  label="Evento"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.nome}
                />
              </Grid2>
              <Grid2 item size={6}>
                <TextField
                  label="CPF"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.usuario.contato.cpf}
                />
                <TextField
                  label="Celular"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.usuario.contato.celular.replace(
                    /(\d{2})(\d{5})(\d{4})/,
                    "($1) $2-$3"
                  )}
                />
                <TextField
                  label="Função"
                  sx={{ mb: 2 }}
                  fullWidth
                  variant="standard"
                  value={agendamento.funcao}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </PageModal>
  );
};

export default ConfirmarAgendamento;
