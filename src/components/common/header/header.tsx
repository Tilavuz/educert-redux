import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { logout } from "@/features/auth/auth-slice";
import { Bell, LogOut, Search, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useMatches } from "react-router-dom";

export default function Header() {
  const matches = useMatches();
  const dispatch = useDispatch();
  const location = useLocation();
  const newMatches = matches[1]?.pathname.split("/") ?? [""];

  return (
    <header className="py-2 h-[65px] flex items-start justify-between px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {newMatches?.map((match, i) => {
            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={i === 1 ? `/${match}` : match}>{match}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
        <p className="font-bold mt-1 capitalize">
          {location.state ? location.state : location.pathname.slice(1)}
        </p>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div className="border border-[#ccc] rounded-lg flex items-center px-2">
          <label htmlFor="search">
            <Search />
          </label>
          <input
            type="text"
            id="search"
            className="p-2 bg-inherit outline-none"
            placeholder="Type here..."
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(logout())} className="font-bold">
            Log out
          </button>
          <LogOut size={18} />
        </div>
        <Settings size={18} className="cursor-pointer" />
        <Bell size={18} className="cursor-pointer" />
      </div>
    </header>
  );
}
