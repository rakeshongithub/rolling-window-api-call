import { useState, useEffect, useRef } from "react";

export const useFundsWorker = (chunkSize = 4, concurrencyLimit = 5) => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../utils/fundsWorker.js", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      const { type, data } = e.data;
      if (type === "chunk") {
        setFunds((prevFunds) => [...prevFunds, ...data]);
      } else if (type === "complete") {
        setLoading(false);
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const loadFunds = (fundIds) => {
    setFunds([]); // Reset funds before loading
    setLoading(true);

    if (workerRef.current) {
      workerRef.current.postMessage({
        fundIds,
        chunkSize,
        concurrencyLimit,
      });
    }
  };

  return { funds, loading, loadFunds };
};
