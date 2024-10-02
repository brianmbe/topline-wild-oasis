import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("user account successfully update!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err),
  });

  return { isUpdating, updateUser };
}
