import { Link } from "react-router-dom";
import errorSvg from "../assets/svg/error.svg";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <img className="max-w-[600px]" src={errorSvg} alt="error svg" />
      <Link className="underline" to={"/"}>
        Back to Dashboard
      </Link>
    </div>
  );
}
