/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";

import useCreateCabin from "./hooks/useCreateCabin";
import useEditingCabin from "./hooks/useEditingCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditingCabin();
  const isWroking = isCreating || isEditing;

  const { id: editID, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editID);

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function handleFormSubmitOnCreateCabin(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmitOnCreateCabin, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required!" })}
          disabled={isWroking}
        />
      </FormRow>
      <FormRow label={"Maximum Capacity"} error={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required!" })}
          disabled={isWroking}
        />
      </FormRow>
      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required!" })}
          disabled={isWroking}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", { required: "This field is required!" })}
          disabled={isWroking}
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
        />
      </FormRow>
      <FormRow label={"Cabin Photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isWroking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWroking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWroking}>
          {!isEditSession ? "Create new cabin" : "Edit Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
