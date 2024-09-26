/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/authentication/hooks/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load authenticated user
  const { isGettingUser, isAuthenticated } = useUser();

  // 2. If no authenticated user then redirect to the login page '/login'
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) navigate("/login");
  }, [isAuthenticated, isGettingUser, navigate]);

  // 3. Show spinner
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If authenticated user then render the app
  if (isAuthenticated) return children;
}
