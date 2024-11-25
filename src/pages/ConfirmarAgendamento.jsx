import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../services/DataService";
import { useAlerta } from "../context/AlertaContext";
import { Typography } from "@mui/material";

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

      setAgendamento(response);
    })();
  }, [agendamentoId]);

  return (
    <>
      <Typography>{JSON.stringify(agendamento)}</Typography>
    </>
  );
};

export default ConfirmarAgendamento;
