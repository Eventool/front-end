import { Avatar, Box, Chip } from "@mui/material";

const Pill = ({ num, label, idFunc, handleClick, handleDelete }) => {
  return (
    <Chip
      m={2}
      color="secondary"
      avatar={<Avatar>{num}</Avatar>}
      label={label}
      onClick={() => handleClick(idFunc)}
      onDelete={() => handleDelete(idFunc)}
    />
  );
};

const PillContainer = ({ pills, setPills }) => {
  const handleClick = (id) => {
    //console.log(pills.filter((pill) => pill.id === id));
  };

  const handleDelete = (id) => {
    setPills(pills.filter((pill) => pill.id !== id));
  };

  return (
    <Box sx={{ bgColor: "green" }} flexWrap={"wrap"} display={"flex"} gap={2}>
      {pills &&
        pills.map((pill) => {
          return (
            <Pill
              handleClick={() => {}}
              handleDelete={handleDelete}
              key={pill.id}
              idFunc={pill.id}
              num={pill.qtdColaborador}
              label={pill.funcao.value}
            />
          );
        })}
    </Box>
  );
};

export default PillContainer;
