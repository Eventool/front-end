import React, { createContext, useContext, useState, useCallback } from "react";
import Alerta from "../components/alerta/Alerta";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

// Create the context
const AlertaContext = createContext();

export function AlertaProvider({ children }) {
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [alertaLabel, setAlertaLabel] = useState("");
  const [alertaSeverity, setAlertaSeverity] = useState("");
  const [alertaIcon, setAlertaIcon] = useState(null);
  const [alertaUndoCallback, setAlertaUndoCallback] = useState(null);

  const showAlerta = useCallback(
    (label, severity, icon, undoCallback = null) => {
      setAlertaLabel(label);
      setAlertaIcon(icon);
      setAlertaSeverity(severity);
      setAlertaUndoCallback(() => undoCallback);
      setAlertaOpen(true);
    },
    []
  );

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

  const info = useCallback(
    (label) => {
      showAlerta(label, "info", <InfoIcon />);
    },
    [showAlerta]
  );

  const warning = useCallback(
    (label) => {
      showAlerta(label, "warning", <WarningIcon />);
    },
    [showAlerta]
  );

  const undo = useCallback(
    (label, undoCallback) => {
      showAlerta(label, "success", <CheckIcon />, undoCallback);
    },
    [showAlerta]
  );

  return (
    <AlertaContext.Provider value={{ success, error, info, warning, undo }}>
      <Alerta
        setAlertaOpen={setAlertaOpen}
        severity={alertaSeverity}
        open={alertaOpen}
        label={alertaLabel}
        icon={alertaIcon}
        undoCallback={alertaUndoCallback}
      />
      {children}
    </AlertaContext.Provider>
  );
}

export function useAlerta() {
  return useContext(AlertaContext);
}
