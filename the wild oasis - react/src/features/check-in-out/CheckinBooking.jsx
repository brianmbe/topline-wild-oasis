import { useEffect, useState } from "react";
import styled from "styled-components";

import useBooking from "../bookings/hooks/usebooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/hooks/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const StyledSpan = styled.span`
  padding: 0.3rem;
  background-color: blue;
  color: white;
  border-radius: 5px;
  text-align: center;
  align-items: center;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPayment(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPayment) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* CONFIRMING BREAKFAST ADDITION */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPayment(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for{" "}
            <span style={{ fontWeight: "bold" }}>
              {formatCurrency(optionalBreakfast)}
            </span>{" "}
            {numGuests > 1 ? `(all guests)` : ""}
          </Checkbox>
        </Box>
      )}

      {/* CONFIRMING PAYMENTS & CHECK-IN */}
      <Box>
        <Checkbox
          checked={confirmPayment}
          onChange={() => setConfirmPayment((confirm) => !confirm)}
          disabled={confirmPayment || isCheckingIn}
          id="confirm"
        >
          I can confirm that <StyledSpan>{guests.fullName}</StyledSpan> has paid
          the total amount of{" "}
          <span style={{ fontWeight: "bold" }}>
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfast
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfast
                )})`}
          </span>
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
