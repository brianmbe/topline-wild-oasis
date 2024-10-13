/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import useBooking from "./hooks/usebooking";

import Modal from "../../ui/Modal";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking - #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(-1)}>Check In</Button>
        )}
        {status === "unconfirmed" && (
          <Button
            variation="danger"
            onClick={() => {
              deleteBooking(bookingId);
              navigate(-1);
            }}
            disabled={isDeleting}
          >
            Delete Booking
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(bookingId)}
            disabled={isDeleting}
          >
            Check Out
          </Button>
        )}

        {status === "checked-out" && (
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
