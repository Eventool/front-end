import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";

const CampoSugestao = ({ options, onChange, multiple = true }) => {
  return (
    <Grid size={12}>
      <Autocomplete
        disableCloseOnSelect={multiple}
        multiple={multiple}
        options={options}
        onChange={onChange}
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;

          return (
            <li key={option.email} {...restProps}>
              {" "}
              <Avatar
                src={option.avatar}
                alt={option.name}
                sx={{ marginRight: 1 }}
              />
              <div>
                <span>{option.name}</span>
                <br />
                <small>{option.email}</small>
              </div>
            </li>
          );
        }}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => {
            const tagProps = getTagProps({ index });
            const { key, ...restTagProps } = tagProps;

            return (
              <Chip
                key={option.email}
                avatar={<Avatar src={option.avatar} alt={option.name} />}
                label={`${option.name} (${option.email})`}
                {...restTagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Usuários"
            placeholder="Selecione usuários"
          />
        )}
      />
    </Grid>
  );
};

export default CampoSugestao;
