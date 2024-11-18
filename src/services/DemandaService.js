import axios from "axios";

export const buscarDemandas = async () => {
  try {
    const response = await axios.get("http://localhost:8080/demandas", {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
      },
    });

    if (response.status !== 200) return;

    return response.data;
  } catch (err) {
    //console.log(err.response.status);
  }
};
