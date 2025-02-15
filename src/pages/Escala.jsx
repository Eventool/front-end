import React, { useEffect } from "react";
import Tabela from "../components/tabela/Tabela";
import { colaboradores } from "../utils/dataMockUtil";
import { formatarObjetos } from "../utils/util";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, ButtonBase } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Circle } from "@mui/icons-material";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

const Escala = ({ setTitulo }) => {
  const handleEditClick = (id) => {
    //console.log(id);
  };

  const handleViewClick = (id) => {
    //console.log(id);
  };

  const columns = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 45,
    },
    {
      field: "nome",
      headerName: "Nome",
      flex: 2,
    },
    {
      field: "celular",
      headerName: "Celular",
      type: "text",
      width: 180,
    },
    {
      field: "cpf",
      headerName: "CPF",
      type: "text",
      width: 180,
    },
    {
      field: "dataNascimento",
      headerName: "Data de Nascimento",
      type: "text",
      width: 200,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      type: "text",
      flex: 1,
    },
    {
      field: "uf",
      headerName: "Estado",
      type: "text",
      width: 120,
    },
    {
      field: "farol",
      headerName: "Farol",
      headerAlign: "center",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <span
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Circle sx={{ color: "red", fontSize: 30 }} />
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <span
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            padding: "6px",
          }}
        >
          <ButtonBase
            key={`view-${params.id}`}
            sx={{ marginRight: 0.5, borderRadius: 2 }}
            onClick={() => handleViewClick(params.id)}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={39}
            >
              <VisibilityIcon sx={{ color: "#515151" }} />
            </Box>
          </ButtonBase>
          <ButtonBase
            key={`edit-${params.id}`}
            sx={{ borderRadius: 2 }}
            onClick={() => handleEditClick(params.id)}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={39}
            >
              <EditIcon sx={{ color: "#515151" }} />
            </Box>
          </ButtonBase>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setTitulo("Escala");
    formatarObjetos(colaboradores);
  });

  return (
    <>
      <Tabela columns={columns} rows={colaboradores} />
    </>
  );
};

export default Escala;
