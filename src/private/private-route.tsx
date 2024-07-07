import { RootState } from "@/app/store";
import Loader from "@/components/common/loader";
import { actionToken } from "@/helpers/action-token";
import useGetAuth from "@/hooks/use-get-auth";
import { ProviderPropsInterface } from "@/interfaces/provider-props";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<ProviderPropsInterface> = ({ children }) => {
  const { getToken } = actionToken;
  const auth = useSelector((state: RootState) => state.auth.auth);
  const { getAuth } = useGetAuth();

  useEffect(() => {
    const token = getToken('token');
    if (token) {
      getAuth();
    }
  }, [getAuth, getToken, auth]);

  const handleAuth = () => {
    if (getToken('token') && auth) {
      return children;
    } else if (getToken('token') && !auth) {
      return <Loader />;
    } else {
      return <Navigate to='/login' />;
    }
  };

  return handleAuth();
};

export default PrivateRoute;
