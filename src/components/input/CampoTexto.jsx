import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { aplicarMascara } from "../../utils/util";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  endAdornment,
  inputRef,
  handleErros = () => {},
}) => {
  const [possuiErro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState(defaultMessage);
  const [firstInteracted, setFirstInteracted] = useState(false);

  useEffect(() => {
    handleErros({ name: name, value: possuiErro });
  }, [possuiErro, name]);

  const handleOnChange = (e) => {
    setFirstInteracted(true);

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
        error={firstInteracted && possuiErro}
        helperText={
          firstInteracted && possuiErro ? (
            <Typography
              variant="caption"
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 15 }} />
              {msgErro}
            </Typography>
          ) : (
            ""
          )
        }
        required={required}
        onKeyUp={onKeyUp}
        variant="outlined"
        defaultValue={defaultValue}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,

            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null,
            style: style,
          },
        }}
      />
    </Grid>
  );
};

export default CampoTexto;
