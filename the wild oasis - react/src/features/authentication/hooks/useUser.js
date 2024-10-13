import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export function useUser() {
  const { isLoading: isGettingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isGettingUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
