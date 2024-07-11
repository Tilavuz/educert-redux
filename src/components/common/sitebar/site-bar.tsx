import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { list } from "./list";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleMenu } from "@/features/menu/menu-slice";

export default function Sitebar() {

  const { menu } = useSelector((state: RootState) => state.menu)
  const dispatch = useDispatch()

  return (
    <aside
      className={`border-r h-screen py-4 select-none ${
        menu ? "w-[365px]" : ""
      }`}
    >
      <div className="flex items-center justify-start px-4 pb-2 border-b border-b-[#ccc] mb-6">
        <Button onClick={() => dispatch(toggleMenu())} variant={"ghost"}>
          <Menu />
        </Button>
        <Link className="font-bold" to={"/"}>
          {menu ? "EDUCERT DASHBOARD" : ""}
        </Link>
      </div>
      <div>
        <ul className="flex flex-col gap-2 mb-8">
          {list.map((item) => {
            return (
              <li key={item.title}>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    cn(
                      `py-2 px-3 flex items-center font-bold rounded-lg ${
                        menu ? "gap-3" : "justify-center"
                      }`,
                      isActive ? "bg-white" : "bg-inherit"
                    )
                  }
                  end
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "p-2 rounded-2xl",
                          isActive
                            ? "bg-[#4fd1c5] text-white"
                            : "bg-white text-[#4fd1c5]"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={cn(
                          "",
                          isActive ? "text-black" : "text-[#a0a0a0]"
                        )}
                      >
                        {menu ? item.title : ''}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}