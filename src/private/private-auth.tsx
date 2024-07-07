import { RootState } from '@/app/store';
import Loader from '@/components/common/loader';
import { actionToken } from '@/helpers/action-token';
import useGetAuth from '@/hooks/use-get-auth';
import { ProviderPropsInterface } from '@/interfaces/provider-props';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthPrivateRoute: FC<ProviderPropsInterface> = ({ children }) => {
    const { getToken } = actionToken
    const { auth } = useSelector((state: RootState) => state.auth)
    
    const { getAuth } = useGetAuth()
    useEffect(() => {
      const token = getToken('token')
      if(token) {
        getAuth()
      }
    }, [])
    const handleAuth = () => {
      if(getToken('token') && auth) {
        return true
      }else if(getToken('token') && !auth) {
        return <Loader />
      }else {
        return false
      }
    }
    const is = handleAuth()

  return (
    <>
      {
        is ? <Navigate to={'/'} /> : children
      }
    </>
  );
};

export default AuthPrivateRoute;
