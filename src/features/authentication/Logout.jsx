// import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";

import { useLogout } from "./hooks/useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <>
      <ButtonIcon onClick={logout} disabled={isLoggingOut}>
        {!isLoggingOut ? <HiLogout /> : <SpinnerMini />}
      </ButtonIcon>
    </>
  );
}
