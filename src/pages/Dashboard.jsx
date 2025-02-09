import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LineChart, PieChart, ResponsiveChartContainer } from "@mui/x-charts";
import { useTheme } from "@emotion/react";
import { useLayout } from "../layouts/Layout";

const Dashboard = () => {
  const { setTitulo, setActions } = useLayout();

  useEffect(() => {
    setTitulo("Dashboard");
    setActions(null);
  });
  const tileStyle = {
    padding: 16,
    color: "#333",
  };

  const theme = useTheme();

  const data1 = [
    { label: "Não iniciado", value: 100, color: theme.palette.paper.dark },
    { label: "Em andamento", value: 300, color: theme.palette.primary.main },
    { label: "Finalizado", value: 300, color: theme.palette.secondary.main },
  ];

  const uData = [35, 30, 22, 27, 21, 23, 34];
  const xLabels = ["MAR", "ABR", "JUN", "JUL", "AGO", "SET", "OUT"];

  const kpisData = [
    { label: "Colaboradores ativos", value: "382", variant: "primary" },
    { label: "A ser faturado", value: "R$ 12.972,89", variant: "secondary" },
    { label: "Atrasos por evento", value: "4,4 %" },
    { label: "Não comparecimentos", value: "12" },
  ];

  return (
    <Grid container spacing={3} pl={4} pr={4}>
      {kpisData.map((kpi, index) => {
        return <Kpi key={index} {...kpi} />;
      })}

      <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
        <Paper style={tileStyle} elevation={3}>
          <Typography variant="h6">Eventos por status</Typography>
          <Typography>Quantidade de eventos em cada status</Typography>
          <PieChart
            series={[
              {
                data: data1,
                innerRadius: 40,
                outerRadius: 80,
                cornerRadius: 5,
              },
            ]}
            height={300}
            slotProps={{
              legend: { hidden: false },
            }}
          />
        </Paper>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
        <Paper style={tileStyle} elevation={3}>
          <Typography variant="h6">Check-ins por mês</Typography>
          <Typography>Quantidade de check-ins nos últimos meses</Typography>
          <LineChart
            height={300}
            series={[
              {
                data: uData,
                label: "Check-ins",
                color: theme.palette.secondary.main,
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const Kpi = ({ label, value, variant }) => {
  let style = {};

  switch (variant) {
    case "primary":
      style = {
        bg: "primary.main",
        font: "white.main",
      };
      break;

    case "secondary":
      style = {
        bg: "secondary.main",
        font: "white.main",
      };
      break;

    default:
      style = {
        bg: "white.main",
        font: "primary.main",
      };
      break;
  }

  return (
    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ bgcolor: style.bg }} elevation={3}>
        <Box
          className="flexColumn"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            height: 150,
          }}
        >
          <Typography color={style.font} variant="h6">
            {label}
          </Typography>
          <Typography color={style.font} fontSize={40}>
            {value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Dashboard;
