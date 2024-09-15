import { useEffect, useRef, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: 2px solid var(--color-grey-100);
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 999;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  width: 200px;
  max-height: 150px;
  overflow-y: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openID, setOpenID] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenID("");
  const open = setOpenID;

  return (
    <MenusContext.Provider
      value={{ openID, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openID, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    let x = rect.left;
    let y = rect.bottom + 8;

    const dropdownWidth = 200; // Assume dropdown width
    const dropdownHeight = 150; // Assume dropdown height

    // Check for right overflow
    if (x + dropdownWidth > window.innerWidth) {
      x = window.innerWidth - dropdownWidth - 16;
    }

    // Check for bottom overflow
    if (y + dropdownHeight > window.innerHeight) {
      y = rect.top - dropdownHeight - 8;
    }

    setPosition({ x, y });
    openID === "" || openID !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openID, close, position } = useContext(MenusContext);
  const ref = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    if (openID === id) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on unmount or when menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openID, id, close]);

  if (openID !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
