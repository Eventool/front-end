import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../services/DataService";
import { useAlerta } from "../context/AlertaContext";


 const PaginaUsuario = ({
  setTitulo = () => {},
  setActions = () => {},
  toggleDialog,
  setDialogContent,
  setDialogAction,
 }) => {
    useEffect(() => {
      setTitulo("");
      setActions(null);
    }, []);

    const { userId } = useParams();
    const alerta = useAlerta()
    const [usuario, setUsuario] = useState({});


    useEffect(() => {
        (async () => {
            const response = await fetchData(`usuarios/${userId}`);

            if (response.error) {
                alerta.error("Não foi possível buscar usuário");
                return;
            }

            console.log(response);
            setUsuario(response);
        })()
    }, userId)

 }
 
 export default PaginaUsuario;