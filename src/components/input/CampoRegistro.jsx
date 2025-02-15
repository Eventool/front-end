import { InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { aplicarMascara } from "../../utils/util";
import { useEffect, useState } from "react";

const CampoRegistro = ({
  editando,
  handleChange,
  label,
  name,
  value,
  startAdornment,
  sx,
  defaultMessage = "Campo inválido",
  size = { sm: 12, md: 6 },
  mascara,
  textSize = { min: 3, max: 48 },
  regex,
  required,
  handleErros = () => {},
  imutavel,
}) => {
  const [possuiErro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState(defaultMessage);

  useEffect(() => {
    handleErros({ name: name, value: possuiErro });
  }, [possuiErro, name]);

  useEffect(() => {
    if (!editando) setErro(false);
  }, [editando]);

  const handleOnChange = (e) => {
    if (!editando || imutavel) {
      e.preventDefault();
      return;
    }

    let valorAtual = e.target.value.slice(0, textSize.max);

    if (mascara) valorAtual = aplicarMascara(valorAtual, mascara);

    validate(valorAtual);

    e.target.value = valorAtual;

    handleChange(e, name);
  };

  const validate = (valorAtual) => {
    setErro(() => {
      return regex && !regex.test(valorAtual);
    });

    setErro(() => {
      if (regex && !regex.test(valorAtual)) {
        setMsgErro(defaultMessage);

        return true;
      } else if (
        valorAtual.length !== 0 &&
        (valorAtual.length < textSize.min || valorAtual.length > textSize.max)
      ) {
        setMsgErro(
          `O campo deve possuir entre ${textSize.min} e ${textSize.max} caracteres.`
        );

        return true;
      } else if (required && valorAtual.length === 0) {
        setMsgErro(`O campo é obrigatório.`);

        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <Grid size={size}>
      <TextField
        fullWidth
        margin="normal"
        label={label}
        name={name}
        value={value}
        onChange={handleOnChange}
        error={possuiErro}
        helperText={possuiErro ? msgErro : ""}
        required={required}
        sx={sx}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
            readOnly: !editando,
          },
        }}
        variant={editando ? "outlined" : "standard"}
      />
    </Grid>
  );
};

export default CampoRegistro;
