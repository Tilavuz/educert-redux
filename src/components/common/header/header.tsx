import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { logout } from "@/features/auth/auth-slice";
import { Bell, LogOut, Search, Settings, Slash } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useMatches } from "react-router-dom";

export default function Header() {
  const matches = useMatches()
  const newMatches = matches[1]?.pathname.split('/') ?? ['']
  const dispatch = useDispatch()

  return (
    <header className="py-2 h-[65px] flex items-start justify-between px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {
            newMatches.length && newMatches.map((match, i) => {
              if (match === '' && i === 0 || match !== '') {
                return (
                  <div key={i} className="flex items-center gap-1">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link className={`${i === newMatches.length - 1 ? "text-black" : ""}`} to={`/${match}`}>{match === '' && i === 0 ? "Pages" : `${match.charAt(0).toUpperCase() + match.slice(1)}`}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                      newMatches.length - 1 === i ? "" : <Slash size={12} />
                    }
                  </div>
                )
              }
            })
          }
        </BreadcrumbList>
        <p className="font-bold mt-1">
          {
            newMatches[newMatches.length - 1].charAt(0).toUpperCase() + newMatches[newMatches.length - 1].slice(1)
          }
        </p>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <div className="border border-[#ccc] rounded-lg flex items-center px-2">
          <label htmlFor="search">
          <Search />
          </label>
          <input type="text" id="search" className="p-2 bg-inherit outline-none" placeholder="Type here..." />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(logout())} className="font-bold">Log out</button>
          <LogOut size={18} />
        </div>
        <Settings size={18} className="cursor-pointer" />
        <Bell size={18} className="cursor-pointer" />
      </div>
    </header>
  )
}