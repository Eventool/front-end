import axios from "axios";
import Cookies from 'js-cookie';

export const buscarDemandas = async () => {
  try {
    const response = await axios.get("http://localhost:8080/demandas", {
      headers: {
        Authorization: `Bearer ${Cookies.get("TOKEN")}`,
      },
    });

    if (response.status !== 200) return;

    return response.data;
  } catch (err) {
    //console.log(err.response.status);
  }
};
