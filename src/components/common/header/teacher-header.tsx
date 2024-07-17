import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/auth-slice";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function TeacherHeader() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Educert
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Button
              variant={"ghost"}
              type="button"
              className="items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <Menu size={24} />
            </Button>
            <Button onClick={() => dispatch(logout())} variant={"outline"}>
              Log out
            </Button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="#"
                  className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
