import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Modal,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Registro from "../../layouts/Registro";
import { useNavigate, useParams } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import dayjs from "dayjs";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import CampoSugestao from "../../components/input/CampoSugestao";
import { fetchData, postData } from "../../services/DataService";
import Botao from "../../components/btn/Botao";
import Picklist from "../../components/input/Picklist";
import { useAlerta } from "../../context/AlertaContext";

const RegistroDemanda = ({
  setTitulo,
  setActions,
  toggleDialog,
  setDialogContent,
  setDialogAction,
}) => {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const alerta = useAlerta();

  const columnsEscala = [
    {
      field: "funcaoEscala",
      headerName: "Função",
      flex: 1.5,
    },
    {
      field: "qtdColaborador",
      headerName: "Qtd. Colaboradores",
      flex: 1,
    },
    {
      field: "horasJornada",
      headerName: "Horas Jornada",
      flex: 1,
    },
    {
      field: "valor",
      headerName: "Custo Total",
      type: "text",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(params);
      },
      flex: 1,
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
            onClick={() => navigate("/demandas/" + params.id)}
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
        </span>
      ),
    },
  ];

  const statusStyles = {
    Disponível: { color: "white", backgroundColor: "green" },
    Pendente: { color: "white", backgroundColor: "orange" },
    Confirmado: { color: "white", backgroundColor: "blue" },
    Encerrado: { color: "white", backgroundColor: "gray" },
  };

  const columnsAgendamento = [
    {
      field: "funcao",
      headerName: "Função",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const style = statusStyles[params.value] || {};
        return <Chip label={params.value} style={style} />;
      },
    },
    {
      field: "horarioEntrada",
      headerName: "Entrada",
      type: "text",
      flex: 1,
      renderCell: (params) => {
        return dayjs(params.value).format("DD/MM/YYYY HH:mm") || "-";
      },
    },
    {
      field: "horarioSaida",
      headerName: "Saída",
      type: "text",
      flex: 1,
      renderCell: (params) => {
        return params.value
          ? dayjs(params.value).format("DD/MM/YYYY HH:mm")
          : "-";
      },
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
            onClick={() => navigate("/demandas/" + params.id)}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={39}
            >
              <PersonAddIcon sx={{ color: "#515151" }} />
            </Box>
          </ButtonBase>
        </span>
      ),
    },
  ];

  let struct = {
    object: {
      name: "Demanda",
      value: "demanda",
      resource: "demandas",
    },
    header: {
      fields: [
        {
          name: "Evento",
          value: "evento.nome",
          type: "text",
        },
      ],
    },
    tabs: [
      {
        name: "Detalhes",
        sections: [
          {
            name: "Evento",
            fields: [
              {
                label: "Nome",
                name: "nome",
                value: "nome",
              },
              {
                label: "Custo Total",
                name: "custoTotal",
                value: "custoTotal",
                type: "dinheiro",
                immutable: true,
              },
              {
                label: "Início",
                name: "inicio",
                value: "inicio",
                type: "date",
                errorMsg: "O início não pode ser anterior ao presente.",
              },
              {
                label: "Fim",
                name: "fim",
                value: "fim",
                type: "date",
                minDateTime: "inicio",
                errorMsg: "O fim não pode ser anterior ao início.",
              },
              {
                label: "Tipo de Contrato",
                name: "tipoContrato",
                value: "tipoContrato",
                immutable: true,
              },
              {
                label: "Coordenador",
                name: "responsavel",
                value: "responsavel.contato.nome",
                immutable: true,
              },
            ],
          },
        ],
      },
      {
        name: "Escalas",
        sections: [
          {
            columns: columnsEscala,
            rowsValue: "escalas",
          },
        ],
      },
      {
        name: "Agendamentos",
        sections: [
          {
            columns: columnsAgendamento,
            rowsValue: "agendamentos",
          },
        ],
      },
    ],
    tabsAction: [
      {
        id: "Escalas",
        label: "Adicionar escala",
        icon: <GroupIcon />,
        type: "create",
        action: "/demandas/criar?eventId=",
      },
      {
        id: "Agendamentos",
        label: "Convidar",
        icon: <SendIcon />,
        type: "function",
        action: () => setOpen(true),
      },
    ],
  };

  const [open, setOpen] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [escalaOptions, setEscalaOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedEscala, setSelectedEscala] = useState({ id: "", value: "" });

  const handleEscalaChange = (e) => {
    const escala = escalaOptions.find((escala) => escala.id === e.target.value);

    setSelectedEscala(escala);
  };

  useEffect(() => {
    (async () => {
      const response = await fetchData("usuarios");
      setUserOptions(
        response.map((item) => {
          return {
            id: item.email,
            name: item.contato.nome,
            email: item.email,
          };
        })
      );
    })();

    (async () => {
      const response = await fetchData(`escalas/${recordId}/demanda`);

      setEscalaOptions(
        response.map((escala) => {
          return {
            value: escala.funcaoEscala,
            id: escala.id,
          };
        })
      );
    })();
  }, [open, recordId]);

  const handleClose = () => {
    setSelectedUsers([]);
    setSelectedEscala({ id: "", value: "" });
    setOpen(false);
  };

  const handleConvidar = async () => {
    const request = {
      emails: selectedUsers.map((user) => {
        return user.email;
      }),
    };

    const response = await postData(
      `escalas/${selectedEscala.id}/invite`,
      request
    );

    if (response.error) {
      alerta.error("Não foi possível realizar o agendamento.");
      return;
    }

    alerta.success("Convites enviados com sucesso.");
    struct = { ...struct };
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{"Convidar colaboradores"}</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Picklist
              size={12}
              label={"Função"}
              name={"funcao"}
              value={selectedEscala.id}
              handleChange={handleEscalaChange}
              items={escalaOptions}
            />
            <CampoSugestao
              options={userOptions}
              onChange={(event, value) => setSelectedUsers(value)}
            />
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Botao
            color="primary"
            variant="outlined"
            txt="Cancelar"
            onClick={handleClose}
          />
          <Botao
            onClick={handleConvidar}
            disabled={selectedUsers.length === 0 || selectedEscala.id === ""}
            txt="Convidar"
          />
        </DialogActions>
      </Dialog>
      <Registro
        setTitulo={setTitulo}
        setActions={setActions}
        toggleDialog={toggleDialog}
        setDialogContent={setDialogContent}
        setDialogAction={setDialogAction}
        struct={struct}
      />{" "}
    </>
  );
};

export default RegistroDemanda;
