import { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/root-layout";

// Pages
import Home from "@/pages/home/home";
import Login from "@/pages/auth/login";
const ErrorPage = lazy(() => import("@/pages/error-page"));

// Components
import Loader from "@/components/common/loader";
import PrivateRoute from "./private/private-route";
import Tables from "@/pages/tables/tables";
import Teachers from "@/pages/teachers";
import Students from "@/pages/students";
import Users from "@/pages/users";
import TeacherWorkTime from "@/pages/teacher-worktime";
import Schedule from "@/pages/schedule";
import { useDispatch } from "react-redux";
import { actionToken } from "./helpers/action-token";
import { getUserData } from "./features/auth/auth-slice";
import { AppDispatch } from "./app/store";

export default function App() {
  const token = actionToken.getToken("token");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/tables",
          element: (
            <PrivateRoute roles={["admin", "user"]}>
              <Tables />
            </PrivateRoute>
          ),
        },
        {
          path: "/teachers",
          element: (
            <PrivateRoute roles={["admin", "user"]}>
              <Teachers />
            </PrivateRoute>
          ),
        },
        {
          path: "/students",
          element: (
            <PrivateRoute roles={["admin", "user"]}>
              <Students />
            </PrivateRoute>
          ),
        },
        {
          path: "/users",
          element: (
            <PrivateRoute roles={["admin", "user"]}>
              <Users />
            </PrivateRoute>
          ),
        },
        {
          path: "/teachers/:id",
          element: (
            <PrivateRoute roles={["admin", "user"]}>
              <TeacherWorkTime />
            </PrivateRoute>
          ),
        },
        {
          path: "/class-schedule",
          element: (
            <PrivateRoute roles={["user", "admin"]}>
              <Schedule />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
