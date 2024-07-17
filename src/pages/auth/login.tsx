import { apiClient } from "@/api/api-client";
import { AppDispatch, RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import {
  getUserData,
  loginFail,
  loginStart,
  loginSuccess,
} from "@/features/auth/auth-slice";
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actionToken } from "@/helpers/action-token";
import { toast, Toaster } from "sonner";

export default function Login() {
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { auth, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { setToken } = actionToken;

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch]);

  useEffect(() => {
    if (auth && !location?.state) {
      navigate('/');
      return
    }
    if(auth && location?.state) {
      navigate(location.state.from.pathname)
    }
  }, [auth]);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const loginData = {
        phone: phoneRef?.current?.value,
        password: passwordRef?.current?.value,
      };
      const res = await apiClient.post("/auth/login", loginData);
      
      if (res.data.token) {
        setToken("token", res.data.token);
        dispatch(loginSuccess(res.data.auth));
        return;
      }
      toast.error(res.data.message);
      dispatch(loginFail(res.data.message))
    } catch (err) {
      dispatch(loginFail(err instanceof Error ? err.message : "Server error!"));
      toast.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={login}
        className="border-2 flex flex-col gap-2 p-2 rounded-md max-w-[500px] w-full"
      >
        <h1 className="font-bold text-2xl p-4">Login page</h1>
        <Input
          ref={phoneRef}
          className="border rounded outline-none py-2 px-4"
          type="text"
          placeholder="Phone number"
          required
          defaultValue={"+998"}
          name="phone"
        />
        <Input
          ref={passwordRef}
          className="border rounded outline-none py-2 px-4 mb-2"
          type="password"
          placeholder="********"
          required
          name="password"
        />
        <button className="font-bold border bg-black text-white mb-2 rounded-md p-2">
          {loading ? "loading..." : "Kirish"}
        </button>
      </form>
      <Toaster richColors />
    </div>
  );
}
