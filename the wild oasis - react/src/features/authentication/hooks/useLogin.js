import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // manually setting the user from the cache
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provide email or password is incorrect");
    },
  });

  return { login, isLoggingIn };
}