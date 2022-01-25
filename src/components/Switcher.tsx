import loadable from '@loadable/component';
import routes from 'config/routes';
import { useAuth } from 'hooks/AuthContext';
import NotFound from 'pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute } from 'types';
import withError from './HOCs/withError';
import withLoading from './HOCs/withLoading';

const Switcher = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route: IRoute) => {
          const allowed =
            !route.permissions.length ||
            (!!user && route.permissions.includes(user.profileRole));
          const componentRoute = !allowed ? 'NotAllowed' : route.component;
          const Component = loadable(() => import(`pages/${componentRoute}`));
          const EnhacedComponent = withLoading(withError(Component));
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<EnhacedComponent />}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Switcher;
