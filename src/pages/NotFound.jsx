import React, { useEffect } from "react";
import { useLayout } from "../layouts/Layout";

const NotFound = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Página não encontrada.");
    setActions(null);
  });

  return <></>;
};

export default NotFound;
