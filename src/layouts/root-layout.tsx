import Header from "@/components/common/header/header";
import TeacherHeader from "@/components/common/header/teacher-header";
import SiteBar from "@/components/common/sitebar/site-bar";
import PrivateRoute from "@/private/private-route";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <div className="flex items-start">
      <PrivateRoute roles={["user", "admin"]}>
        <SiteBar />
      </PrivateRoute>
      <div className="w-full">
        <PrivateRoute roles={['admin', 'user']}>
          <Header />
        </PrivateRoute>
        <PrivateRoute roles={['teacher']}>
          <TeacherHeader />
        </PrivateRoute>
        <div className="py-8 px-6 h-[92vh] overflow-y-scroll">
          <Outlet />
          <Toaster richColors />
        </div>
      </div>
    </div>
  );
}
