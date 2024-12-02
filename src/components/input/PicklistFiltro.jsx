import { MenuItem, Select, Typography } from "@mui/material";

const PicklistFiltro = ({ item, applyValue, apiRef, options }) => {
  const handleChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <>
      <Typography m={"-2px"} p={0} color="rgba(0, 0, 0, 0.6)" variant="caption">
        Valores
      </Typography>
      <Select
        multiple
        value={item.value || []}
        onChange={handleChange}
        style={{ width: "100%" }}
        renderValue={(selected) => selected.join(", ")}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default PicklistFiltro;
