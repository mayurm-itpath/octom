import { Route, Routes } from "react-router-dom";
import PrivateLayout from "../layout/PrivateLayout";
import useRoute from "../hooks/useRoute";
import NotFoundPage from "../pages/NotFoundPage";
import AuthLayout from "../layout/AuthLayout";

const Routing = () => {
  const { privateRoutes, publicRoutes } = useRoute();
  
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<AuthLayout />}>
          {publicRoutes.map(({ id, element: Element, ...other }) => (
            <Route key={id} element={<Element />} {...other} />
          ))}
        </Route>

        <Route element={<PrivateLayout />}>
          {privateRoutes.map(({ id, element: Element, ...other }) => (
            <Route key={id} element={<Element />} {...other} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
