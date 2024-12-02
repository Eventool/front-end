import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { ptBR as dataGridPtBR } from "@mui/x-data-grid/locales";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Tabela = ({ columns, rows }) => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterModel, setFilterModel] = useState({ items: [] });

  const handleFilterChange = (newFilterModel) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = {
      ...currentParams,
      filters: JSON.stringify(newFilterModel.items),
    };

    setSearchParams(updatedParams);
    console.log(updatedParams);
    setFilterModel(newFilterModel);
  };

  const clearFilters = () => {
    setFilterModel({ items: [] });

    const currentParams = Object.fromEntries(searchParams.entries());
    delete currentParams.filters;
    setSearchParams(currentParams);
  };

  useEffect(() => {
    const filtersFromUrl = searchParams.get("filters");
    if (filtersFromUrl) {
      try {
        const parsedFilters = JSON.parse(filtersFromUrl);
        setFilterModel({ items: parsedFilters });
      } catch (error) {
        console.error("Filtros inválidos", error);
      }
    }
  }, [searchParams]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ alignSelf: "flex-end" }}>
        <Tooltip title="Limpar filtros">
          <IconButton
            onClick={clearFilters}
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              width: 32,
              height: 32,
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            disabled={filterModel.items.length === 0}
          >
            <FilterListOffIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <DataGrid
        localeText={dataGridPtBR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={handleFilterChange}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnResize
      />
    </Box>
  );
};

export default Tabela;
