import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const DataHora = ({
  handleChange,
  name,
  label,
  value,
  minDateTime,
  disablePast = true,
  variant = "outlined",
  handleErros = () => {},
  erros = {},
  errorMsg = "Data inválida.",
}) => {
  return (
    <Grid size={6}>
      <DateTimePicker
        // slots={{ textField: TextField }}

        onError={(error) => handleErros({ name, value: !!error })}
        slotProps={{
          textField: {
            helperText: erros[name] ? errorMsg : "",
          },
        }}
        disablePast={disablePast}
        minDateTime={minDateTime}
        required
        ampm={false}
        onChange={handleChange}
        name={name}
        label={label}
        value={value}
        variant={variant}
        sx={{ width: "100%", mt: 2 }}
      />
    </Grid>
  );
};

export default DataHora;
