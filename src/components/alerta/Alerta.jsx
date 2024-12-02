import { Alert, Snackbar, Button } from "@mui/material";

const Alerta = ({
  label,
  icon,
  severity = "success",
  variant = "filled",
  open,
  setAlertaOpen,
  undoCallback = null, // Add optional undo callback
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertaOpen(false);
  };

  const handleUndo = () => {
    if (undoCallback) undoCallback(); // Execute undo callback if provided
    setAlertaOpen(false); // Close the alert
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        icon={icon}
        severity={severity}
        variant={variant}
        action={
          undoCallback && (
            <Button color="inherit" size="small" onClick={handleUndo}>
              Desfazer
            </Button>
          )
        }
        onClose={handleClose}
      >
        {label}
      </Alert>
    </Snackbar>
  );
};

export default Alerta;
