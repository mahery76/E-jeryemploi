import axios from "axios";
import { useEffect, useState } from "react"

export const getHttp = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const getData = async () => {
    try {
      const res = await axios.get(url)
      setData(res.data)
      setError(null)
    } catch (err) {
      console.error(err.message)
      setError(err.message)
    }
  }
  useEffect(() => {
    getData();
  }, [url])
  return { data, error }
}


export const deleteHttp = async (url) => {
  try {
    const deleteAccount = await axios.delete(url);
    console.log(deleteAccount);
  } catch (err) {
    console.log(err.message);
  }
};


export const postHttp = async (url, data) => {
  try {
    const resp = await axios.post(url, data);
    console.log(resp);
    return resp
  } catch (err) {
    console.log(err.message);
  }
};

export const putHttp = async (url, data) => {
  try {
    const resp = await axios.put(url, data);
    console.log(resp);
  } catch (err) {
    console.log(err.message);
  }
};

export const getId = async (url) => {
  try {
    const getAccount = await axios.get(url);
    console.log(getAccount);
  } catch (err) {
    console.log(err.message);
  }
};



export default { getHttp, postHttp, deleteHttp, putHttp };
