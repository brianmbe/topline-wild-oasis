import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (newUser) => {
      toast.success(
        "Account successfully created, please vrify the new user's account!"
      );
    },
  });

  return { signUp, isSigningUp };
}
