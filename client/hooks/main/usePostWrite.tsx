import { useMutation, useQueryClient } from "@tanstack/react-query";
import postWrite from "apis/main/postWrite";
import { toast } from "react-toastify";

const usePostWrite = () => {
  const queryClient = useQueryClient();

  return useMutation(postWrite, {
    onSuccess: res => {
      queryClient.invalidateQueries(["cards"]);
    },
    onError: (err: any) => {
      if (err.response.status === 504) {
        toast.error(err.response.data.message, {
          autoClose: 1500,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("과외를 다시 등록해주세요", {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  });
};

export default usePostWrite;
