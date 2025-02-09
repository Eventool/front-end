import axios from "axios";
import { urlData } from "./DataService";
import Cookies from "js-cookie";

export const convidarUsuarios = async (request, id) => {
    try {
        const response = await axios.post(`${urlData}escalas/${id}/invite`, request, {
          headers: {
            Authorization: `Bearer ${Cookies.get("TOKEN")}`,
          },
        });
    
        return response.data;
      } catch (err) {
        return {
          error: true,
          message: err.response.data.message,
          data: err.response.data,
          status: err.response.status,
        };
      }
}