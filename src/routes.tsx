import AuthGuard from "components/authentication/AuthGuard";
import GuestGuard from "components/authentication/GuestGuard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import LoadingScreen from "components/LoadingScreen";
import CreateTemplate from "pages/CreateTemplate";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const MyProducts = Loadable(lazy(() => import("./pages/MyProducts")));
const MyTemplates = Loadable(lazy(() => import("./pages/MyTemplates")));

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

// user management
const UserList = Loadable(
  lazy(() => import("./pages/userManagement/UserList"))
);
const UserGrid = Loadable(
  lazy(() => import("./pages/userManagement/UserGrid"))
);
const AddNewUser = Loadable(
  lazy(() => import("./pages/userManagement/AddNewUser"))
);
const Resume = Loadable(lazy(() => import("./pages/Resume")));

const Error = Loadable(lazy(() => import("./pages/404")));

export const routesResume = [
  {
    path: "resume-builder/:id",
    element: (
      <AuthGuard>
        <Resume />
      </AuthGuard>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "forget-password",
    element: (
      <GuestGuard>
        <ForgetPassword />
      </GuestGuard>
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <MyProducts />,
      },
      {
        path: "list-templates",
        element: <MyTemplates />,
      },
      {
        path: "create-template/:id",
        element: <CreateTemplate />,
      },
      {
        path: "default",
        element: <DashboardSaaS />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "user-grid",
        element: <UserGrid />,
      },
      {
        path: "add-user",
        element: <AddNewUser />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
