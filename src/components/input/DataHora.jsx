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
}) => {
  return (
    <Grid size={6}>
      <DateTimePicker
        onError={(error) => handleErros({ name, value: !!error })}
        disablePast={disablePast}
        minDateTime={minDateTime}
        defaultValue={dayjs().add(1, "day").startOf("day")}
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
