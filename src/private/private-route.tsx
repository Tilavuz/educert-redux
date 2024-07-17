import { AppDispatch, RootState } from "@/app/store";
import { getUserData } from "@/features/auth/auth-slice";
import { actionToken } from "@/helpers/action-token";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { auth, error } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const token = actionToken.getToken("token");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (token && !error && !auth) {
    return <p>loader...</p>;
  }

  if (!auth)
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;

  if (auth && roles.includes(auth.role)) {
    return children;
  }
}
