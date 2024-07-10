import Header from "@/components/common/header/header";
import SiteBar from "@/components/common/sitebar/site-bar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <div className="flex items-start">
      <SiteBar />
      <div className="w-full">
        <Header />
        <div className="py-8 px-6 h-[92vh] overflow-y-scroll">
          <Outlet />
          <Toaster expand={true} richColors />
        </div>
      </div>
    </div>
  );
}
