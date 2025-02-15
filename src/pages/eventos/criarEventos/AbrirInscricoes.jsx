import {
  Autocomplete,
  Box,
  ButtonBase,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState } from "react";
import { useAlerta } from "../../../context/AlertaContext";

const AbrirInscricoes = ({ dadosEvento }) => {
  const alerta = useAlerta();

  const [share, setShare] = useState([]);
  const [shareAtual, setShareAtual] = useState(null);

  const handleShareChange = (value) => {
    if (value === null) return;

    setShareAtual(value);
    setShare([...share, value]);
    setShareAtual("");
  };

  const handleShareDelete = (id) => {
    setShare(share.filter((item) => item.id !== id));
  };

  const colaboradores = [
    { id: 0, label: "AA João" },
    { id: 1, label: "AB João" },
    { id: 2, label: "AC João" },
    { id: 3, label: "AD João" },
    { id: 4, label: "BA João" },
    { id: 5, label: "BB João" },
    { id: 6, label: "BC João" },
    { id: 7, label: "BD João" },
    { id: 8, label: "BE João" },
  ];
  return (
    <>
      <Grid display={"flex"} justifyContent={"center"} width="100%" size={12}>
        <Typography mb={2} mt={2} variant="h5" component="h5">
          Abrir Inscrições
        </Typography>
      </Grid>
      <Box
        width={"80%"}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        margin={"auto"}
      >
        <TextField
          label="Link para inscrição das escalas"
          fullWidth
          value={dadosEvento.url}
          disabled
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <ButtonBase
                    onClick={() => {
                      navigator.clipboard.writeText(dadosEvento.url);
                      alerta.success("Copiado para a área de transferência");
                    }}
                    sx={{ borderRadius: "50%", p: 1 }}
                  >
                    <ContentPasteIcon sx={{ fontSize: 25 }} />
                  </ButtonBase>
                </InputAdornment>
              ),
            },
          }}
        />
        <Autocomplete
          onChange={(event, newValue) => {
            handleShareChange(newValue);
          }}
          disablePortal
          options={colaboradores}
          renderInput={(params) => (
            <TextField {...params} label="Convidar colaboradores" />
          )}
        />
        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
          {share &&
            share.map((item, index) => {
              return (
                <Chip
                  key={index}
                  label={item.label}
                  onDelete={() => handleShareDelete(item.id)}
                />
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export default AbrirInscricoes;
