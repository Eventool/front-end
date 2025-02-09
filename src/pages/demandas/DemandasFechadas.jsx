import React, { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const DemandasFechadas = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Demandas fechadas");
    setActions(null);
  });

  return <>Demandas fechadas</>;
};

export default DemandasFechadas;
