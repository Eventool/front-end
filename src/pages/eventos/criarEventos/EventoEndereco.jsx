import { Typography, TextField, Autocomplete, Grid2 } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampoTexto from "../../../components/input/CampoTexto";
import axios from "axios";
import { estados } from "../../../utils/dataMockUtil";

const EventoEndereco = ({
  handleEnderecoChange,
  handleUfChange,
  dadosEvento,
  handleViaCEPResponse,
}) => {
  const handleViaCEP = async (e, name) => {
    handleEnderecoChange(e, name);

    if (e.target.value.length !== 9) return;

    const response = await axios.get(
      `https://viacep.com.br/ws/${e.target.value}/json/`
    );

    if (response.data.erro) return;

    const enderecoChange = {
      logradouro: response.data.logradouro,
      uf: response.data.uf,
      cidade: response.data.localidade,
    };

    handleViaCEPResponse(enderecoChange);
  };

  return (
    <>
      <Grid
        mb={2}
        mt={6}
        display={"flex"}
        justifyContent={"center"}
        width="100%"
        size={12}
      >
        <Typography variant="h5" component="h5">
          Dados do Evento
        </Typography>
      </Grid>
      <Grid width="80%" margin="auto" container columnSpacing={2}>
        <CampoTexto
          size={12}
          handleChange={handleEnderecoChange}
          value={dadosEvento.endereco?.logradouro}
          name="logradouro"
          label="Logradouro"
        />
        <CampoTexto
          handleChange={handleViaCEP}
          value={dadosEvento.endereco?.cep}
          name="cep"
          mascara="cep"
          regex={/^\d{5}-\d{3}$/}
          label="CEP"
        />
        <CampoTexto
          handleChange={handleEnderecoChange}
          value={dadosEvento.endereco?.numero}
          mascara="numeroPositivo"
          name="numero"
          textSize={{ min: 0, max: 12 }}
          label="Número"
        />
        <CampoTexto
          handleChange={handleEnderecoChange}
          value={dadosEvento.endereco?.cidade}
          name="cidade"
          label="Cidade"
        />
        <Grid2 size={6} mt={2}>
          <Autocomplete
            disablePortal
            options={estados}
            getOptionLabel={(option) => option.value}
            value={
              estados.find(
                (estado) => estado.id === dadosEvento.endereco?.uf
              ) || null
            }
            onChange={handleUfChange}
            renderInput={(params) => <TextField {...params} label="Estado" />}
          />
        </Grid2>
      </Grid>
    </>
  );
};

export default EventoEndereco;
