import { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const EventosFechados = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Eventos fechados");
    setActions(null);
  });

  return <>Eventos fechados</>;
};

export default EventosFechados;
