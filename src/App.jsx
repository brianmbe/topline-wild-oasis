import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  margin: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid --color-grey-300;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />

      <StyledApp>
        <H1>The Wild Oasis</H1>;
        <Button onClick={() => alert("Checked in")}>Check in</Button>
        <Button onClick={() => alert("Checked out")}>Check out</Button>
        <Input type="number" placeholder="Number of guests.........." />
      </StyledApp>
    </>
  );
}

export default App;
