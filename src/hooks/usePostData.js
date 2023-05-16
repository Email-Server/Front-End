import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
const usePostData = (endPoint, body, depend) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .post(endPoint, body, { signal: controller.signal })
      .then((res) => {
        setLoading(false);
        setError("");
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });

    return () => controller.abort();
  }, [...depend]);

  return { data, loading, error };
};

export default usePostData;
