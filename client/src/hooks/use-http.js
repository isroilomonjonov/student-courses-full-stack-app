import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useHttp = (reqFn, startWithLoading = false) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (startWithLoading) {
      send();
    }
  },[]);
  const send = async (reqData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await reqFn(reqData);
      setData(data);
      if (data && data.message) {
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return {
    send,
    loading,
    error,
    data,
  };
};
export default useHttp;
