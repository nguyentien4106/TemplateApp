import { COOKIE_TOKEN_KEY } from "@/constants/cookie";
import { AuthUser } from "@/types/layout/common";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const Protected = ({ children }: ProtectedRouteProps) => {
	const token = Cookies.get(COOKIE_TOKEN_KEY)

	if(!token || !jwtDecode<AuthUser>(token).email){
		return <Navigate to="/sign-in" replace />;
	}

	return children;
};
