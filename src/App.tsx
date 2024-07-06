import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/root-layout";

// Pages
import Home from "@/pages/home/home";
import Login from "@/pages/auth/login";
const ErrorPage = lazy(() => import("@/pages/error-page"));
const Tables = lazy(() => import("@/pages/tables/tables")) 

// Components
import Loader from "@/components/common/loader";
import PrivateRoute from "./private/private-route";
import AuthPrivateRoute from "./private/private-auth";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
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
          element: (
            <Suspense fallback={<Loader />}>
              <Tables />
            </Suspense>
          ),
        },
        {
          path: "/teachers",
          element: (
            <Suspense fallback={<Loader />}>
              <p>page</p>
            </Suspense>
          ),
        },
        {
          path: "/students",
          element: (
            <Suspense fallback={<Loader />}>
              <p>page</p>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthPrivateRoute>
          <Login />
        </AuthPrivateRoute>
      ),
      errorElement: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
