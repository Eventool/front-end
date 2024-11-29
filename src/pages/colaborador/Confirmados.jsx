import { useEffect, useState } from "react";
import { useAlerta } from "../../context/AlertaContext";
import { fetchData } from "../../services/DataService";
import MudarVisualizacao from "../../components/mudarVisualizacao/MudarVisualizacao";
import { Box } from "@mui/material";
import { CardConvite } from "./Convites";
import { useNavigate } from "react-router-dom";

const EventosConfirmados = ({ setTitulo, setActions }) => {
  useEffect(() => {
    setTitulo("Eventos");
    setActions(null);
  });

  const [convitesData, setConvitesData] = useState([]);
  const [convites, setConvites] = useState([]);
  const [conviteSelecionado, setConviteSelecionado] = useState({});
  const alerta = useAlerta();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `agendamentos/usuario/${sessionStorage.ID}`
      );

      if (response.error) {
        alerta.error("Não foi possível buscar convites");
        return;
      }

      setConvites(
        response.filter((convite) => convite.status === "Confirmado")
      );
      setConvitesData(response);
    })();
  }, [alerta]);

  return (
    <>
      <MudarVisualizacao />
      <Box display={"flex"} flexWrap={"wrap"} gap={2} mt={2}>
        {convites &&
          convites.map((item, index) => {
            return (
              <CardConvite
                handleClick={() => navigate("/convites/" + item.id)}
                key={index}
                convite={item}
              />
            );
          })}
      </Box>
    </>
  );
};

export default EventosConfirmados;
