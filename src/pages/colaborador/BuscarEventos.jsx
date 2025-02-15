import { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const BuscarEventos = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Buscar eventos");
    setActions(null);
  });

  return <></>;
};

export default BuscarEventos;
