import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEffect } from "react";

function CreateCabinForm() {
  const { register, handleSubmit, getValues, formState, reset, watch } =
    useForm();
  const queryClient = useQueryClient();
  const { errors, isDirty } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleFormSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  // Warn the user when trying to close the form with unsaved changes
  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isDirty]);

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required!" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label={"Maximum Capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required!" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required!" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", { required: "This field is required!" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          {...register("description", { required: "This field is required!" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label={"Cabin Photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          {...register("image", {
            required: "Please upload an image",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* Cancel Button */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => reset()} // Reset form when canceling
          disabled={isCreating}
        >
          Cancel
        </Button>
        {/* Submit Button */}
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
