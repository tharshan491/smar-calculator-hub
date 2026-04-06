// frontend/src/hooks/useCalc.js
// Reusable hook: wraps any API function with loading / error / result state
import { useState, useCallback } from "react";

export function useCalc(apiFn) {
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const calculate = useCallback(async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFn(inputs);
      setResult(data);
      return data;
    } catch (e) {
      setError(e.message || "Calculation failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  const reset = useCallback(() => { setResult(null); setError(null); }, []);

  return { calculate, result, loading, error, reset };
}
