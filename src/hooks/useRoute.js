import { useMemo } from 'react';
import { URLS } from '../constants/urls';
import HomePage from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TasksPage from '../pages/TasksPage';
import UsersPage from '../pages/UsersPage';
import ForgotPasswodPage from '../pages/ForgotPasswodPage';

const useRoute = () => {
    const allRoutes = useMemo(() => [
        {
            id: 'login',
            path: URLS.LOGIN,
            element: LoginPage,
            isAuth: true
        },
        {
            id: 'register',
            path: URLS.REGISTER,
            element: RegisterPage,
            isAuth: true
        },
        {
            id: 'forgotPassword',
            path: URLS.FORGOTPASSWORD,
            element: ForgotPasswodPage,
            isAuth: true
        },
        {
            id: 'root',
            path: URLS.INITIAL,
            element: HomePage,
            isPrivate: true
        },
        {
            id: 'tasks',
            path: URLS.TASKS,
            element: TasksPage,
            isPrivate: true
        },
        {
            id: 'users',
            path: URLS.USERS,
            element: UsersPage,
            isPrivate: true
        }
    ], []);

    const privateRoutes = useMemo(() => allRoutes.filter(route => route.isPrivate), [allRoutes]);

    const publicRoutes = useMemo(() => allRoutes.filter(route => route.isAuth), [allRoutes]);

    return { privateRoutes, publicRoutes };
};

export default useRoute;
