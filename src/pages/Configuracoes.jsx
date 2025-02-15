import { useEffect } from "react";
import PageModal from "../components/pageModal/PageModal";
import { Typography } from "@mui/material";
import { useLayout } from "../layouts/Layout";

const Configuracoes = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, []);

  return (
    <PageModal>
      <Typography variant="h4">Configurações</Typography>
    </PageModal>
  );
};

export default Configuracoes;
