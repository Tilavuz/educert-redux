import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "@/features/auth/auth-slice";
import { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionToken } from "@/helpers/action-token";

export default function Login() {
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setToken } = actionToken;

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const loginData = {
        phone: phoneRef?.current?.value,
        password: passwordRef?.current?.value,
      };
      const res = await apiClient.post("/auth/login", loginData);
      setToken("token", res.data.token);
      navigate("/");
      dispatch(loginSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(
        loginFail(error instanceof Error ? error.message : "Server error!")
      );
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => login(e)}
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
        />
        <Input
          ref={passwordRef}
          className="border rounded outline-none py-2 px-4 mb-2"
          type="password"
          placeholder="********"
          required
        />
        <button className="font-bold border bg-black text-white mb-2 rounded-md p-2">
          {loading ? "loading..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
