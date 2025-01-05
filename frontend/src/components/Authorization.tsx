import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials } = appContext;

  if (!userCredentials || userCredentials.user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export const AuthenticatedUserRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials } = appContext;

  if (!userCredentials) {
    return <Navigate to="/" />;
  }
  return children;
};

export const VisitorRoute = ({ children }: { children: React.ReactNode }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials } = appContext;

  if (userCredentials) {
    return <Navigate to="/" />;
  }
  return children;
};
