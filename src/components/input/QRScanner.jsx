import React, { useEffect, useState } from "react";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrScanner from "react-qr-scanner";
import { useAlerta } from "../../context/AlertaContext";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

const QRScannerDialog = ({ realizarCheckin }) => {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const alerta = useAlerta();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsScanning(false);
  };

  const handleScan = (data) => {
    if (data) {
      const value = data.text;
      if (!/^\d{0,6}$/.test(value)) {
        alerta.error("Código inválido. Tente novamente");
      } else {
        realizarCheckin(value);
      }
      setScanResult(value);

      setIsScanning(false);
      handleClose();
    } else {
      setIsScanning(true);
    }
  };

  const handleError = (err) => {
    setIsScanning(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<QrCodeIcon />}
        onClick={handleOpen}
      >
        Escanear
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Escanear Código QR</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              position: "relative",
              width: "300px",
              height: "300px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <QrScanner
              onError={handleError}
              onScan={handleScan}
              style={{
                width: "500px",
                height: "500px",
                position: "absolute",
                transform: "scaleX(-1)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: "60%",
                height: "60%",
                border: "2px dashed #4caf50",
                borderRadius: "8px",
                zIndex: 2,
              }}
            ></Box>

            {isScanning && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Escaneando...
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRScannerDialog;
