import axios from "axios";

export const fetchData = async (resource) => {
  try {
    const response = await axios.get(urlData + resource, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
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
};

export const fetchParamsData = async (resource, params) => {
  try {
    const response = await axios.get(urlData + resource, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
      },
      params: params
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
};

export const postData = async (resource, request) => {
  try {
    const response = await axios.post(urlData + resource, request, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
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
};

export const putData = async (resource, request, id) => {
  try {
    const response = await axios.put(`${urlData}${resource}/${id}`, request, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
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
};

export const deleteData = async (resource, id) => {
  try {
    const response = await axios.delete(`${urlData}${resource}/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
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
};

export const exportData = async (resource, params) => {
  try {
    const response = await axios.post(`${urlData}${resource}/export`, null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
      },
      params: params,
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${resource}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    return {
      error: true,
      message: err.response.data.message,
      data: err.response.data,
      status: err.response.status,
    };
  }
};

export const urlData = "http://localhost:8080/";
