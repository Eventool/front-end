import React, { createContext, useContext, useState, useCallback } from "react";
import Alerta from "../components/alerta/Alerta";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

// Create the context
const AlertaContext = createContext();

export function AlertaProvider({ children }) {
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [alertaLabel, setAlertaLabel] = useState("");
  const [alertaSeverity, setAlertaSeverity] = useState("");
  const [alertaIcon, setAlertaIcon] = useState(null);

  const showAlerta = useCallback((label, severity, icon) => {
    setAlertaLabel(label);
    setAlertaIcon(icon);
    setAlertaSeverity(severity);
    setAlertaOpen(true);
  }, []);

  const success = useCallback(
    (label) => {
      showAlerta(label, "success", <CheckIcon />);
    },
    [showAlerta]
  );

  const error = useCallback(
    (label) => {
      showAlerta(label, "error", <BlockIcon />);
    },
    [showAlerta]
  );

  return (
    <AlertaContext.Provider value={{ success, error }}>
      <Alerta
        setAlertaOpen={setAlertaOpen}
        severity={alertaSeverity}
        open={alertaOpen}
        label={alertaLabel}
        icon={alertaIcon}
      />
      {children}
    </AlertaContext.Provider>
  );
}

export function useAlerta() {
  return useContext(AlertaContext);
}
