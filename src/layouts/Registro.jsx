import { useEffect, useState } from "react";
import PageModal from "../components/pageModal/PageModal";
import Imagem from "../components/imagem/Imagem";
import { fetchData } from "../services/DataService";
import { useNavigate, useParams } from "react-router-dom";
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, ButtonBase, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import img from "../assets/evento-card-bg.png"
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@emotion/react";
import { aplicarMascara } from "../utils/formatarUtil";
import dayjs from "dayjs";
import OutlinedBox from "../components/box/OutlinedBox";
import Mapa from "../mapa/Mapa";
import CampoRegistro from "../components/input/CampoRegistro";
import Tabela from "../components/tabela/Tabela";
import { getDemandas } from "../utils/dataMockUtil";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteEvento, putEvento } from "../services/EventoService";
import DataHora from "../components/input/DataHora";
import FloatingBotao from "../components/btn/FloatingBotao";

const Registro = ({setTitulo, setActions, showToast, toggleDialog, setDialogContent, setDialogAction}) => {

    useEffect(() => {
        setTitulo('');
        setActions(null);
    }, [])

    const { eventId } = useParams();
    const navigate = useNavigate();

    const [evento, setEvento] = useState(null);
    const [eventoEditado, setEventoEditado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);

    const guias = ['Detalhes', 'Demandas', 'Escalas'];
    const [guia, setGuia] = useState(guias[0]);

    const columns = [
        {
          field: "nome",
          headerName: "Nome",
          flex: 2,
        },
        {
          field: "inicio",
          headerName: "Inicio",
          type: "text",
          flex: 1,
        },
        {
          field: "fim",
          headerName: "Fim",
          type: "text",
          flex: 1,
        },
        {
          field: "evento",
          headerName: "Evento",
          type: "text",
          flex: 2,
        },
        {
          field: "tipoContrato",
          headerName: "Tipo Contrato",
          type: "text",
          flex: 1.5,
        },
        {
          field: "custoTotal",
          headerName: "Custo Total",
          type: "text",
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
              <span style={{display: "flex", height: "100%", justifyContent: "center", padding: "6px"}}>
                <ButtonBase
                  key={`view-${params.id}`}
                  sx={{ marginRight: 0.5, borderRadius: 2 }}
                  onClick={() => console.log(params.id)}
                >
                  <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={39}>
                    <VisibilityIcon sx={{color: "#515151"}} />
                  </Box>
                </ButtonBase>
                <ButtonBase 
                  key={`edit-${params.id}`}
                  sx={{ borderRadius: 2 }}
                  onClick={() => console.log(params.id)}
                >
                  <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={39}>
                    <EditIcon sx={{color: "#515151"}} />
                  </Box>
                </ButtonBase>
              </span>
            ),
          },
    ]

    const handleEditarEvento = () => {
        setEditando(true)
    }

    const handleCampoChange = (e, name) => {
        setEventoEditado({ ...eventoEditado, [name]: e.target.value })
    }

    const handleSalvar = async () => {
        const response = await putEvento(eventoEditado, evento.id);

        if (!response) {
            showToast("Erro ao atualizar evento", "error", <BlockIcon/>);
            return;
        }

        setEvento({ ...response });
        setEditando(false);
        showToast(`Evento ${response.nome} atualizado com sucesso`)
    }

    const handleCancelar = () => {
        setEventoEditado({ ...evento });
        setEditando(false);
    }

    const handleEnderecoChange = (e, name) => {
        let novoEndereco = eventoEditado.endereco;
        novoEndereco = { ...novoEndereco, [name]: e.target.value}
        setEventoEditado({ ...eventoEditado, endereco: novoEndereco})
    }

    const handleTimeChange = (e, name) => {
        setEventoEditado({ ...eventoEditado, [name]: e.format('YYYY-MM-DDTHH:mm:ss') });
    };

    useEffect(() => {
        const buscarEvento = async () => {
            try {
                const data = await fetchData(`eventos/${eventId}`);
                setEvento(data);
                setEventoEditado(data);
            } catch (err) {
                console.log("Erro ao buscar evento: " + err);
                showToast("Erro ao buscar evento", "error", <BlockIcon/>)
            }
        }

        buscarEvento();
    }, [])



    const handleDeletar = async () => {
        setDialogContent({
            title: "Deseja excluir?",
            body: <>O evento <b>{evento.nome}</b> será excluido permanentemente</>
        });

        setDialogAction(() => async () => {
            const { status } = await deleteEvento(evento.id);

            if (status !== 204) {
                showToast("Erro ao excluir evento", "error", <BlockIcon/>);
                return;
            }

            showToast("Evento excluido com sucesso");

            navigate('/eventos');
        });

        toggleDialog();
    }

    const handleConfirmarVoltar = async () => {
        setDialogContent({
            title: "Deseja voltar?",
            body: <>As alterações não serão salvas</>
        });

        setDialogAction(() => async () => {
            navigate(-1);
        });

        toggleDialog();
    }

    return (
        <PageModal>
            <Box mb={1} className="flexRowBetween">
                <Box className="flexRowCenter" gap={1}>
                    <ButtonBase onClick={() => {editando ? handleConfirmarVoltar() : navigate(-1)}} disableRipple sx={{borderRadius: "50%", p: "8px"}}>
                        <ArrowBackIosIcon fontSize="32px"/>
                    </ButtonBase>
                    <Typography variant="h6">Evento</Typography>
                </Box>
            </Box>
            {evento && 
                <>
                    <Box sx={{
                        position: 'sticky', 
                        top: -16, 
                        zIndex: 1000,
                        bgcolor: '#ffffff'}}>
                    <Box mb={3} p={1} className="flexRowBetween" sx={{ alignItems: 'flex-end' }}>
                        <Box className="flexRowCenter">
                            <Typography variant="h5">{evento.nome}</Typography>
                        </Box>
                        <Box className="flexRowStart" sx={{gap: 10}}>
                            <Box className="flexColumnStart">
                                <Typography variant="subtitle1">Status</Typography>
                                <Typography variant="h6">{evento.status}</Typography>
                            </Box>

                            <Box className="flexColumnStart">
                                <Typography variant="subtitle1">Orçamento</Typography>
                                <Typography variant="h6"><small>R$</small> {aplicarMascara(evento.orcamento.toString(), 'dinheiro')}</Typography>
                            </Box>

                            <Box className="flexColumnStart">
                                <Typography variant="subtitle1">Data do evento</Typography>
                                <Typography variant="h6">{dayjs(evento.inicio).format('DD/MM/YYYY HH:mm')}</Typography>
                            </Box>

                            <Box className="flexColumnStart">
                                <Typography variant="subtitle1">Responsável</Typography>
                                <Typography variant="h6">Antunes</Typography>
                            </Box>

                        </Box>
                        <Box className="flexRowCenter" gap={1}>
                            <Button disabled={editando} variant="contained" color="secondary" startIcon={<EditIcon/>} onClick={handleEditarEvento}>Editar</Button>
                            <Button disabled={editando} variant="outlined" startIcon={<DeleteIcon/>} onClick={handleDeletar}>Excluir</Button>
                        </Box>
                    </Box>
                    <Divider/>
                    </Box>
                    <Box className="flexRowBetween">
                        <Imagem imagem={evento.imagem} placeholder={img}/>
                        <Box>
                        </Box>
                    </Box>
                    <Guias guiaAtual={guia} guias={guias} setGuia={setGuia}/>

                    <OutlinedBox sx={{mt: 3}}>
                    { guia === guias[0] && 
                        <Box>
                                <Grid container rowGap={3} columnSpacing={2}>
                                    <Grid size={12}>
                                        <Typography variant="h6" component="h6">Evento</Typography>
                                    </Grid>
                                    <CampoRegistro editando={editando} handleChange={handleCampoChange} name="nome" label="Nome" value={eventoEditado.nome} />
                                    <CampoRegistro editando={editando} handleChange={handleCampoChange} name="orcamento" label="Orçamento" startAdornment={"R$"} value={`${aplicarMascara(eventoEditado.orcamento + '', 'dinheiro')}`} />
                                    { !editando && (
                                        <>
                                            <CampoRegistro editando={editando} handleChange={handleCampoChange} name="inicio" label="Início" value={dayjs(eventoEditado.inicio).format('DD/MM/YYYY HH:mm')} />
                                            <CampoRegistro editando={editando} handleChange={handleCampoChange} name="fim" label="Fim" value={dayjs(eventoEditado.fim).format('DD/MM/YYYY HH:mm')} />
                                        </>
                                    )}
                                    { editando && (
                                        <>
                                            <DataHora editando={editando} handleChange={(e) => handleTimeChange(e, 'inicio')} name="inicio" label="Início" value={dayjs(eventoEditado.inicio)} />
                                            <DataHora editando={editando} handleChange={(e) => handleTimeChange(e, 'fim')} name="fim" label="Fim" value={dayjs(eventoEditado.fim)} />
                                        </>
                                    )}
                                    <CampoRegistro editando={false} name="formulario" label="Formulário" value={eventoEditado.formulario.nome} />
                                    <Divider/>
                                    <Grid size={12}>
                                        <Typography variant="h6" component="h6">Endereço</Typography>
                                    </Grid>
                                    <CampoRegistro editando={editando} handleChange={handleEnderecoChange} name="logradouro" label="Logradouro" value={eventoEditado.endereco.logradouro} />
                                    <CampoRegistro editando={editando} handleChange={handleEnderecoChange} name="numero" label="Número" value={eventoEditado.endereco.numero} />
                                    <CampoRegistro editando={editando} handleChange={handleEnderecoChange} name="cep" label="CEP" value={eventoEditado.endereco.cep} />
                                    <CampoRegistro editando={editando} handleChange={handleEnderecoChange} name="cidade" label="Cidade" value={eventoEditado.endereco.cidade} />
                                    <CampoRegistro editando={editando} handleChange={handleEnderecoChange} name="estado" label="Estado" value={eventoEditado.endereco.uf} />
                                </Grid>
                                <Box className="flexRowCenter" mt={3}>
                                    <Mapa logradouro={eventoEditado.endereco.logradouro} cidade={eventoEditado.endereco.cidade} uf={eventoEditado.endereco.uf} popup={eventoEditado.nome} />
                                </Box>
                        </Box>
                    }
                    { guia === guias[1] && 
                        <>
                        <Tabela columns={columns} rows={getDemandas}/>
                        </>
                    }
                    { guia === guias[2] && 
                        <>
                        <Tabela columns={columns} rows={getDemandas}/>
                        </>
                    }
                    </OutlinedBox>
                </>
            }
            
            {editando && <FloatingBotao handleSalvar={handleSalvar} handleCancelar={handleCancelar}/>}
        </PageModal>
    );
}

const Guias = ({guias, guiaAtual, setGuia}) => {

    const theme = useTheme();

    return (
        <Box mt={2} sx={{display: 'grid', gridTemplateColumns: `repeat(${guias.length}, 1fr)`, width: '30%'}} gap={5}>
            { guias && 
                guias.map((item, index) => {
                    return (
                        <ButtonBase 
                            disableRipple 
                            onClick={() => setGuia(item)} 
                            sx={{borderBottom: `2px solid ${guiaAtual === item ? theme.palette.secondary.main : null}`, pb: '4px'}} 
                            key={index}>
                                <Typography>{item}</Typography>
                        </ButtonBase>
                    );
                })
            }
        </Box>
    )
}

export default Registro;