import { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const EventosPendentes = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Eventos pendentes");
    setActions(null);
  });

  return <></>;
};

export default EventosPendentes;
