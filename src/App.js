import { Suspense, lazy } from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import SuspenseLoader from './components/common/SuspenseLoader';

const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* Redirect the root path to /home */}
      <Route path="/" element={<Navigate to={routes.home.path} />} />

       {/* Define main route to render Main component with nested routes */}
      {/* <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} /> */}
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>

       {/* Direct route for home */}
       <Route path={routes.home.path} element={<routes.home.element />} />

        {/* Redirect invalid paths to emails */}
      <Route path={routes.invalid.path} element={<Navigate to={routes.home.path} />} />

      {/* Additional authentication routes */}
      <Route path={routes.register.path} element={<routes.register.element />} />
      <Route path={routes.login.path} element={<routes.login.element />} />
      <Route path={routes.forgotpassword.path} element={<routes.forgotpassword.element />} />
      <Route path={routes.resetpassword.path} element={<routes.resetpassword.element />} />

    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;


