import { useEffect, useState } from "react";
import PageModal from "../components/pageModal/PageModal";
import { Box, Button, TextField, Typography } from "@mui/material";
import QRScanner from "../components/input/QRScanner";
import { fetchData, fetchParamsData } from "../services/DataService";
import { useNavigate } from "react-router-dom";
import { useLayout } from "../layouts/Layout";

const CheckIn = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, []);

  const [codigo, setCodigo] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const navigate = useNavigate();

  const handleScanSuccess = (result) => {
    setScannedResult(result);
    setIsDialogOpen(false); // Close dialog after a successful scan
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setCodigo(value);
    }
  };

  const realizarCheckin = async (digito) => {
    if (!digito && codigo.length !== 6) return;

    const value = digito || codigo;

    const response = await fetchParamsData("agendamentos/check-in", {
      digito: value,
    });

    navigate(response.id);
  };

  return (
    <PageModal>
      <Box className="flexColumnCenter" alignItems="center">
        <Typography variant="h4">Realizar Check-in</Typography>
        <Box
          mt={8}
          mb={4}
          width="30%"
          className="flexColumnCenter"
          alignItems="center"
          gap={5}
        >
          <TextField
            label="Código"
            onChange={handleChange}
            value={codigo}
            slotProps={{
              input: {
                maxLength: 6,
                inputMode: "numeric",
              },
            }}
            fullWidth
          />
          <Button
            disabled={codigo.length !== 6}
            variant="contained"
            onClick={() => realizarCheckin()}
          >
            Confirmar
          </Button>
        </Box>
        <QRScanner realizarCheckin={realizarCheckin} />
        {scannedResult && (
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", color: "green" }}
          >
            Scanned Result: {scannedResult}
          </Typography>
        )}
      </Box>
    </PageModal>
  );
};

export default CheckIn;
