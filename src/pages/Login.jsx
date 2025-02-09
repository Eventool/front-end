import React, { useEffect, useState } from "react";
import { logar } from "../services/UsuarioService";
import CampoTexto from "../components/input/CampoTexto";
import Botao from "../components/btn/Botao";
import axios from "axios";
import { useAlerta } from "../context/AlertaContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import imagemFundo from "../assets/Login.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { emailRegex } from "../utils/util";

const Login = ({ setTitulo, setActions }) => {
  const { login } = useUser();
  const [dados, setDados] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, [setTitulo, setActions]);

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const alerta = useAlerta();

  const handleLogin = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { tipoUsuario } = await logar(dados);
        login({ tipoUsuario });
        navigate("/");
      } catch (err) {
        alerta.error(
          "Erro ao realizar login. Verifique seus dados e tente novamente."
        );
        console.error(err);
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
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          bgcolor: "#ffffff",
          width: {
            xs: "100%",
            sm: 450,
          },
          height: {
            xs: "100%",
            sm: 650,
          },

          left: {
            xs: 0,
            sm: 140,
          },
          position: {
            md: "static",
            lg: "fixed",
          },
          p: {
            xs: 8,
            sm: 4,
          },
          borderRadius: {
            xs: 0,
            sm: 3,
          },
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: 200,
            fontWeight: "normal",
            mb: 12,
            fontSize: "38px",
            marginRight: "10px",
            ml: 0,
          }}
        >
          <b>Entrar</b> em Seren<span style={{ color: "#f27a0c" }}>it</span>y
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
          E-mail:
        </Typography>
        <CampoTexto
          placeholder={"Endereço de e-mail"}
          name="email"
          value={dados.email}
          handleChange={handleChange}
          textSize={{ min: 0, max: 64 }}
          startAdornment={<EmailIcon />}
          borderRadius={"9px"}
          regex={emailRegex}
          defaultMessage={"E-mail inválido"}
        />

        <Typography
          variant="subtitle1"
          sx={{
            mb: 0,
            color: "#182F4E",
            fontWeight: "bold",
            marginTop: "10px",
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
          textSize={{ min: 0, max: 128 }}
          type={showPassword ? "text" : "password"}
          startAdornment={<LockIcon />}
          endAdornment={
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
        />

        <Box sx={{ height: "17%" }} mt={4} className="flexRowCenter">
          {!loading ? (
            <Botao
              sx={{
                width: "100%",
                height: "60px",
                textTransform: "none",
                borderRadius: "12px",
                marginTop: "70px",
              }}
              txt="Login"
              color="primary"
              onClick={handleLogin}
            />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
