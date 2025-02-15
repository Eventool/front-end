import { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const EventosAbertos = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Eventos Abertos");
    setActions(null);
  });

  return <>Eventos abertos</>;
};

export default EventosAbertos;
