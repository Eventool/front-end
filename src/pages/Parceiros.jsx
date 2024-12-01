import React, { useEffect, useState } from "react";
import { getUsuarios } from "../utils/dataMockUtil";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MudarVisualizacao from "../components/mudarVisualizacao/MudarVisualizacao";
import { fetchData } from "../services/DataService";
import { useAlerta } from "../context/AlertaContext";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

const Parceiros = ({ setTitulo, setActions }) => {
  useEffect(() => {
    setTitulo("Parceiros");
    setActions(null);
  }, []);

  const alerta = useAlerta();


  const [usuarios, setUsuarios] = useState([]);
  const [usuariosData, setUsuariosData] = useState([]);
  const [nomePesquisado, setNomePesquisado] = useState("");

  const handleSearchChange = (e) => {
    setNomePesquisado(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetchData("usuarios");

      if (response.error) {
        alerta.error("Não foi possível buscar usuários");
        return;
      }

      setUsuariosData(response);
    })();
  }, [setUsuariosData]);

  useEffect(() => {
    setUsuarios(
      usuariosData.filter((user) =>
        user.contato.nome.toLowerCase().includes(nomePesquisado.toLowerCase())
      )
    );
  }, [setUsuarios, nomePesquisado, usuariosData]);

  return (
    <>
      <MudarVisualizacao
        setFiltroStatus={() => {}}
        handleSearchChange={handleSearchChange}
        opcoesFiltro={""}
        nomePesquisado={""}
        setNomePesquisado={setNomePesquisado}
      />
      <Grid container spacing={3}>
        {usuarios &&
          usuarios.map((usuario, index) => {
            return (
              <Grid
                item
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index}
              >
                <CardUsuario usuario={usuario} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

const CardUsuario = (usuario) => {
  const user = usuario.usuario;
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image="https://via.placeholder.com/150"
        />
        <CardContent onClick={() => navigate("/usuarios/" + user.id)}>
          <Box
            className="flexColumn"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {user.contato.nome}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {dayjs().diff(dayjs(user.contato.dataNascimento), "year")} anos
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {user.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user?.contato?.celular
            ? user.contato.celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
            : "Número indisponível"}
            </Typography>
            <Stack mt={2}>
              <Rating defaultValue={4} precision={0.5} readOnly />
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Parceiros;
