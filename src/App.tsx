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
      element: (
        <PrivateRoute roles={["user", "admin", "teacher"]}>
          <RootLayout />
        </PrivateRoute>
      ),
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
          element: <Tables />,
        },
        {
          path: "/teachers",
          element: <Teachers />,
        },
        {
          path: "/students",
          element: <Students />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/teachers/:id",
          element: <TeacherWorkTime />,
        },
        {
          path: "/class-schedule",
          element: <Schedule />,
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
