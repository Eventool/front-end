import React, { useEffect } from "react";
import { useLayout } from "../../layouts/Layout";

const DemandasAbertas = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Demandas abertas");
    setActions(null);
  });

  return <>Demandas abertas</>;
};

export default DemandasAbertas;
