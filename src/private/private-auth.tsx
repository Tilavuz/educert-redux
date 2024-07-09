import { RootState } from "@/app/store";
import Loader from "@/components/common/loader";
import { actionToken } from "@/helpers/action-token";
import useGetAuth from "@/hooks/use-get-auth";
import { ProviderPropsInterface } from "@/interfaces/provider-props";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


// not worked ****************************

const AuthPrivateRoute: FC<ProviderPropsInterface> = ({ children }) => {
  const { getToken } = actionToken;
  const { auth, error } = useSelector((state: RootState) => state.auth);
  const { getAuth } = useGetAuth();

  useEffect(() => {
    const token = getToken("token");
    if (token) {
      getAuth();
    }
  }, [auth, getAuth, getToken]);

  const handleAuth = () => {
    if (getToken("token") && !auth && error) {
      return children;
    } else if (getToken("token") && !auth && !error) {
      return <Loader />;
    } else {
      return <Navigate to="/" />;
    }
  };

  return handleAuth();
};

export default AuthPrivateRoute;
