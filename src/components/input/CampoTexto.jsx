import { InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { aplicarMascara } from "../../utils/formatarUtil";

const CampoTexto = ({
  handleChange = () => {},
  label,
  name,
  sx,
  value,
  size = { sm: 12, md: 6 },
  regex,
  mascara,
  placeholder,
  defaultMessage = "Campo inválido",
  style,
  required,
  onKeyUp = () => {},
  type = "text",
  textSize = { min: 3, max: 48 },
  margin = "normal",
  defaultValue,
  startAdornment = null,
  inputRef,
  handleErros = () => {},
}) => {
  const [possuiErro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState(defaultMessage);

  useEffect(() => {
    handleErros({ name: name, value: possuiErro });
  }, [possuiErro, name]);

  const handleOnChange = (e) => {
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
        inputRef={inputRef}
        onFocus={(e) => validate(e.target.value)}
        type={type}
        sx={sx}
        placeholder={placeholder}
        fullWidth
        margin={margin}
        label={label}
        name={name}
        value={value}
        onChange={handleOnChange}
        error={possuiErro}
        helperText={possuiErro ? msgErro : ""}
        required={required}
        onKeyUp={onKeyUp}
        variant="outlined"
        defaultValue={defaultValue}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
            style: style,
          },
        }}
      />
    </Grid>
  );
};

export default CampoTexto;
