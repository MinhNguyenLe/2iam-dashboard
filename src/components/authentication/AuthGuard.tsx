import useAuth from "hooks/useAuth";
import React, { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isGettingDefault } = useAuth();

  if (!isAuthenticated && !isGettingDefault) {
    return <Navigate to={"/login"} />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
