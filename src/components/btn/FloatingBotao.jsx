import { Box, Button } from "@mui/material";
import Botao from "./Botao";
import { useCollapsed } from "../../context/CollapsedContext";

const FloatingBotao = ({ handleSalvar, handleCancelar, podeAvancar }) => {
  const { collapsed } = useCollapsed();

  return (
    <Box
      sx={{
        p: 3,
        position: "fixed",
        bottom: 0,
        width: `calc(100% - ${collapsed ? "80" : "260"}px)`,
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
        bgcolor: "#fdfdfd",
        boxShadow: 5,
        right: 0,
        transition: "300ms",
        gap: 1,
      }}
    >
      <Botao
        onClick={handleCancelar}
        variant="outlined"
        color="primary"
        txt="Cancelar"
      />

      <Botao onClick={handleSalvar} txt="Salvar" disabled={podeAvancar} />
    </Box>
  );
};

export default FloatingBotao;
