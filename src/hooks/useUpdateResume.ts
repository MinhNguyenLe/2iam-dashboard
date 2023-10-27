import toast from "react-hot-toast";
import axios from "utils/axios";
import useLoading from "hooks/useLoading";
import { useSelector } from "react-redux";

const useUpdateResume = () => {
  const resume = useSelector((state: any) => {
    const newState = { ...state };
    delete newState._persist;
    return newState;
  });

  const { isLoading, fetch, data } = useLoading({
    onError: (err: any) => {
      toast.error(err);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
  });

  const updateResume = () =>
    fetch(() =>
      axios(`${process.env.REACT_APP_API_URL}/users/update-resume`, {
        withCredentials: true,
        method: "post",
        data: {
          resume,
        },
      })
    );

  return { updateResume, resume, isLoading, data };
};

export default useUpdateResume;
