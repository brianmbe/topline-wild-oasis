/* eslint-disable react/prop-types */
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import useCreateCabin from "./hooks/useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  function handleCopyCabin() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity ? `Fits up to ${maxCapacity} people` : "n/a"}</div>
      <Price>
        {regularPrice ? formatCurrency(regularPrice) : formatCurrency(0)}
      </Price>
      <Discount>{discount ? `${discount}%` : <span>&mdash;</span>}</Discount>
      <div>
        {/* Dropdown Menu for Actions */}
        <Menus.Menu>
          <Menus.Toggle id={cabinId}>Actions</Menus.Toggle>

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleCopyCabin}>
              Copy
            </Menus.Button>
            <Modal>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              {/* Deletion confirmation */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Modal>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}