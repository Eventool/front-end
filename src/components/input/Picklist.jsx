import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Picklist = ({
  items,
  handleChange,
  value,
  name,
  label,
  size = { sm: 12, md: 6 },
  disabled = false,
  itemParam = "value",
  variant = "outlined",
  required = false,
  handleErros = () => {},
}) => {
  const [error, setError] = useState(required && !value);

  useEffect(() => {
    handleErros({ name: name, value: error });
  }, [error, name]);

  const handleValidation = (e) => {
    const selectedValue = e.target.value;

    handleChange(e, name);

    setError(required && !selectedValue);
  };
  return (
    <Grid2 size={size}>
      <FormControl sx={{ width: "100%", mt: 2 }} error={error}>
        <InputLabel id={`${name}-select`}>{label}</InputLabel>
        <Select
          onChange={handleValidation}
          fullWidth
          name={name}
          label={label}
          value={value}
          labelId={`${name}-select`}
          disabled={disabled}
          variant={variant}
          required={required}
        >
          {items &&
            items.length > 0 &&
            items.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item[itemParam]}
                </MenuItem>
              );
            })}
        </Select>
        {error && <FormHelperText>Campo {label} é obrigatório</FormHelperText>}
      </FormControl>
    </Grid2>
  );
};

export default Picklist;
