import { useEffect } from "react";
import PageModal from "../../components/pageModal/PageModal";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    //console.log(recordId);
  }, [recordId]);

  return <PageModal></PageModal>;
};

export default RegistroFormulario;
