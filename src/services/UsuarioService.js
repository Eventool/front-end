import axios from "axios";
import { urlData } from "./DataService";
import Cookies from 'js-cookie';

export const logar = async (dados) => {
  try {
    const response = await axios.post("http://localhost:8080/usuarios/login", {
      email: dados.email,
      senha: dados.senha,
    });

    if (response.status !== 200) return;

    const { token, id, tipoUsuario, contato } = response.data;
    
    Cookies.set('TOKEN', token);
    Cookies.set("ID", id);
    Cookies.set("tipoUsuario", tipoUsuario);
    Cookies.set("nome", contato.nome);

    return response.data; 
  } catch (err) {
    //console.log(err.response.status);
  }
};

export const cadastrar = async (request) => {
  try {
    const response = await axios.post(urlData + 'usuarios/cadastro', request);

    return response;
  } catch (err) {
    return {
      error: true,
      message: err.response.data.message,
      data: err.response.data,
      status: err.response.status,
    };
  }
};