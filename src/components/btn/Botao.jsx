import { Button } from "@mui/material";
import * as React from "react";

const Botao = ({
  color = "secondary",
  variant = "contained",
  txt,
  onClick,
  disabled,
  sx,
  icon,
}) => {
  return (
    <Button
      sx={sx}
      onClick={onClick}
      color={color}
      variant={variant}
      disabled={disabled}
      startIcon={icon}
    >
      {txt}
    </Button>
  );
};

export default Botao;
