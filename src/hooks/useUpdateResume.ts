import toast from "react-hot-toast";
import axios from "utils/axios";
import useLoading from "hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import { removeIdDeep } from "components/ResumeBuilder/lib/utils";
import { clearPersist } from "components/ResumeBuilder/redux/core/actions";

const useUpdateResume = () => {
  const resume = useSelector((state: any) => {
    const newState = { ...state };
    delete newState._persist;
    return newState;
  });

  const dispatch = useDispatch();

    const { isLoading, fetch, data } = useLoading({
    onError: (err: any) => {
      toast.error(err);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
  });

  const updateResume = async () => {
    await fetch(() =>
      axios(`${process.env.REACT_APP_API_URL}/users/update-resume`, {
        withCredentials: true,
        method: "post",
        data: {
          resume: removeIdDeep(resume),
        },
      })
    );

    dispatch(clearPersist());
  };

  return { updateResume, resume, isLoading, data };
};

export default useUpdateResume;
