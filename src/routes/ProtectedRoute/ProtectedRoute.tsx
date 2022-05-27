import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ProtectedRouteInterface } from '../../interfaces';

import { RouteEnum } from '../../enums';
import { useAppSelector } from '../../hooks';

const ProtectedRoute: FC<ProtectedRouteInterface> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.currentUser?.isAuthenticated,
  );
  if (!isAuthenticated) {
    return <Navigate to={RouteEnum.Welcome} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
