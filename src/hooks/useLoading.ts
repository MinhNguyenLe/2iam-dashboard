import { AxiosPromise } from "axios";
import { useState } from "react";

interface UseLoadingParams {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

const useLoading = ({ onSuccess, onError }: UseLoadingParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  async function fetch(cbFetch: () => AxiosPromise<unknown>) {
    setIsLoading(true);

    try {
      const result = await cbFetch();

      onSuccess?.(result);
      setData(result.data);
      setIsLoading(false);

      return result;
    } catch (error) {
      onError?.(error);
      setIsLoading(false);

      return;
    }
  }

  return { fetch, isLoading, data };
};

export default useLoading;
