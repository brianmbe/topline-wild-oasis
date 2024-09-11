import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../../services/apiCabins";
import { useFormState } from "react-hook-form";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { errors } = useFormState;
  console.log(errors);

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
