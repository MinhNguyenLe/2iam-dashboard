import { AxiosPromise } from "axios";
import { useState } from "react";

interface UseLoadingParams {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

const useLoading = ({ onSuccess, onError }: UseLoadingParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetch(cbFetch: () => AxiosPromise<unknown>) {
    setIsLoading(true);

    try {
      const result = await cbFetch();

      onSuccess?.(result);
      setIsLoading(false);

      return result;
    } catch (error) {
      onError?.(error);
      setIsLoading(false);

      return;
    }
  }

  return { fetch, isLoading };
};

export default useLoading;
