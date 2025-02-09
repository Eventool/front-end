import { useEffect, useState } from "react";
import PageModal from "../../components/pageModal/PageModal";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../services/DataService";
import { useAlerta } from "../../context/AlertaContext";
import {
  Backdrop,
  ButtonBase,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Box, display } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import OutlinedBox from "../../components/box/OutlinedBox";
import Grid from "@mui/material/Grid2";
import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";

const RegistroFormulario = ({
  setTitulo,
  setActions,
  toggleDialog,
  setDialogContent,
  setDialogAction,
}) => {
  useEffect(() => {
    setTitulo("");
    setActions(null);
  }, []);

  const { recordId } = useParams();
  const alerta = useAlerta();

  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchData(`forms/${recordId}/google`);

      if (response.error) {
        alerta.error(
          "Erro ao buscar resposta, verifique as configurações de acesso ao formulário selecionado"
        );
        return;
      }

      setFormData(response);
      setLoading(false);
    })();
  }, [recordId]);

  const getRespostas = (respostas, tipo) => {
    const baseStyle = {
      bgcolor: "#ededed",
      p: 1,
      borderRadius: 2,
      my: 1,
      display: "flex",
      justifyContent: "space-between",
    };
    if (["RADIO", "CHECKBOX", "DROP_DOWN"].includes(tipo)) {
      const responseCounts = respostas.reduce((acc, resposta) => {
        resposta.valor.forEach((v) => {
          acc[v] = (acc[v] || 0) + 1;
        });
        return acc;
      }, {});

      const data = Object.keys(responseCounts).map((key) => ({
        name: key,
        value: responseCounts[key],
      }));

      return (
        <Box
          sx={{
            display: "flex",
            height: 300,
            width: { sm: "100%", md: "70%", lg: "50%" },
            margin: "auto",
          }}
        >
          <BarChart
            xAxis={[{ scaleType: "band", data: data.map((d) => d.name) }]}
            yAxis={[
              {
                valueFormatter: (value) =>
                  Number.isInteger(value) ? value : "",
              },
            ]}
            series={[{ data: data.map((d) => d.value), label: "Respostas" }]}
          />
        </Box>
      );
    } else {
      switch (tipo) {
        case "TEXT":
          return (
            <>
              {respostas.map((resposta, index) => (
                <Box sx={baseStyle} key={index}>
                  <Typography>{resposta.valor[0]}</Typography>
                  <Typography>
                    {dayjs(resposta.horarioEnviado).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Box>
              ))}
            </>
          );

        case "DATE":
          return (
            <>
              {respostas.map((resposta, index) => (
                <Box sx={baseStyle} key={index}>
                  <Typography>
                    {dayjs(resposta.valor[0]).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography>
                    {dayjs(resposta.horarioEnviado).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Box>
              ))}
            </>
          );

        default:
          return (
            <>
              {respostas.map((resposta, index) => (
                <Box sx={baseStyle} key={index}>
                  <Typography>{resposta.valor[0]}</Typography>
                  <Typography>
                    {dayjs(resposta.horarioEnviado).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Box>
              ))}
            </>
          );
      }
    }
  };

  return (
    <PageModal>
      <Backdrop
        open={loading}
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 2 })}
      >
        <CircularProgress />
      </Backdrop>
      {!loading && (
        <Box mb={1} className="flexRowBetween">
          <Box className="flexRowCenter" gap={1}>
            <ButtonBase
              onClick={() => {
                navigate("/formularios");
              }}
              disableRipple
              sx={{ borderRadius: "50%", p: "8px" }}
            >
              <ArrowBackIosIcon fontSize="32px" />
            </ButtonBase>
            <Typography variant="h6">Formulário</Typography>
          </Box>
        </Box>
      )}
      {!loading && formData && (
        <>
          <Box
            sx={(theme) => ({
              position: "sticky",
              top: -16,
              zIndex: theme.zIndex.drawer - 1,
              bgcolor: "#ffffff",
            })}
          >
            <Box
              mb={3}
              p={1}
              className="flexRowBetween"
              sx={{ alignItems: "flex-end" }}
            >
              <Box className="flexRowCenter">
                <Typography variant="h5">{formData.formulario}</Typography>
              </Box>
              <Box className="flexRowStart" sx={{ gap: 10 }}></Box>
              <Box className="flexRowCenter" gap={1}></Box>
            </Box>
            <Divider />
          </Box>
          <Box>
            {formData?.questoes &&
              formData.questoes.map((item) => (
                <OutlinedBox key={item.questao.id} sx={{ mt: 3 }}>
                  <Box>
                    <Typography sx={{ mb: 3 }} variant="h6">
                      {item.questao.titulo}
                    </Typography>
                  </Box>
                  {item.respostas &&
                    getRespostas(item.respostas, item.questao.tipo)}
                  {item.respostas.length === 0 && (
                    <Typography>Não há respostas</Typography>
                  )}
                </OutlinedBox>
              ))}
          </Box>
        </>
      )}
    </PageModal>
  );
};

export default RegistroFormulario;
