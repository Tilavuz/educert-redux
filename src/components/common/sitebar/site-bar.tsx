import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { list } from "./list";

export default function Sitebar() {
  return (
    <aside className="w-[365px] border-r h-screen py-4 select-none">
      <div className="flex items-center justify-center pb-2 border-b border-b-[#ccc] mb-6">
        <Link className="font-bold" to={'/'}>EDUCERT DASHBOARD</Link>
      </div>
      <div>
        <ul className="flex flex-col gap-2 mb-8">
          {
            list.map((item) => {
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.route}
                    className={({ isActive }) =>
                      cn(
                        "py-2 px-3 flex items-center gap-3 font-bold rounded-lg",
                        isActive ? "bg-white" : "bg-inherit"
                      )
                    }
                    end
                  >
                    {({ isActive }) => (
                      <>
                        <span className={cn("p-2 rounded-2xl", isActive ? "bg-[#4fd1c5] text-white" : "bg-white text-[#4fd1c5]")}>
                          {item.icon}
                        </span>
                        <span className={cn("", isActive ? "text-black" : "text-[#a0a0a0]")}>{item.title}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}