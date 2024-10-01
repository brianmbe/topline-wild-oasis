import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  background-color: var(--color-grey-300);
  padding: 2rem;
  border-radius: 10px;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
