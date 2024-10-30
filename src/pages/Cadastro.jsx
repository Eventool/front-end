import React, { useEffect, useState } from "react";
import { cadastrar } from "../services/UsuarioService";
import CampoTexto from "../components/input/CampoTexto";
import Botao from "../components/btn/Botao";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useAlerta } from "../context/AlertaContext";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import imagemFundo from "../assets/Cadastro.png";
import { Password } from "@mui/icons-material";

const Cadastro = ({ setTitulo, setActions }) => {
  const { login } = useUser();
  const navigate = useNavigate();

  const alerta = useAlerta();

  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, [setTitulo, setActions]);

  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState({
    email: "",
    senha: "",
    tipoUsuario: 0,
    contato: {
      nome: "",
    },
  });

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleContatoChange = (e) => {
    const contatoNovo = dados.contato;
    contatoNovo.nome = e.target.value;

    setDados({ ...dados, contato: contatoNovo });
  };
  const handleCadastrar = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await cadastrar(dados);

        if (response.error) {
          alerta.error("Não foi possivel realizar o cadastro");
          return;
        }

        alerta.success("Cadastro realizado com sucesso");
        navigate("/login");
      } catch (err) {
        alerta.error("Não foi possivel realizar o cadastro");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Box
      className="flexRowCenter"
      height="100vh"
      sx={{
        backgroundImage: `url(${imagemFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "26%",
          height: "79%",
          p: 8,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: "710px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "normal",
            mb: 12,
            fontSize: "41px",
            marginRight: "10px",
            marginTop: "-2px",
            ml: 0,
          }}
        >
          <b>Cadastrar</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            color: "#182F4E",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Nome:
        </Typography>
        <CampoTexto
          placeholder={"Nome"}
          name="nome"
          value={dados.contato.nome}
          handleChange={handleContatoChange}
          startAdornment={<PersonIcon />}
          borderRadius={"9px"}
        />

        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            color: "#182F4E",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          E-mail:
        </Typography>
        <CampoTexto
          placeholder={"Endereço de e-mail"}
          name="email"
          value={dados.email}
          handleChange={handleChange}
          startAdornment={<EmailIcon />}
          borderRadius={"9px"}
        />

        <Typography
          variant="subtitle1"
          sx={{
            mb: 0,
            color: "#182F4E",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          Senha:
        </Typography>
        <CampoTexto
          borderRadius="6px"
          placeholder={"Senha"}
          name="senha"
          value={dados.senha}
          handleChange={handleChange}
          type="password"
          startAdornment={<LockIcon />}
        />

        <FormControl sx={{ display: "flex", alignItems: "center" }}>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={0}
            name="tipoUsuario"
            onChange={handleChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio color="secondary" />}
              label="CNPJ"
            />
            <FormControlLabel
              value={1}
              control={<Radio color="secondary" />}
              label="CPF"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ height: "17%" }} mt={4} className="flexRowCenter">
          {!loading ? (
            <Botao
              sx={{
                width: "100%",
                height: "60px",
                textTransform: "none",
                borderRadius: "12px",
                marginTop: "0px",
              }}
              txt="Cadastrar"
              color="primary"
              onClick={handleCadastrar}
            />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Cadastro;
