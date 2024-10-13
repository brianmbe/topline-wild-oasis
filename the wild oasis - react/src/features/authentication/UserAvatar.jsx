import styled from "styled-components";
import { useUser } from "./hooks/useUser";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-50);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  const { isDarkMode } = useDarkMode();

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={`Avatar`} />
      <span style={{ color: isDarkMode ? "white" : "black" }}>
        {fullName || "Your Name"}
      </span>
    </StyledUserAvatar>
  );
}
