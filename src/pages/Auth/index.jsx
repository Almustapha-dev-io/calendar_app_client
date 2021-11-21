import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { AuthWrapper, AuthContent } from 'components/ui/PageWrapper';

import Login from './Login';
import RecoverPassword from './RecoverPassword';
import Register from './Register';
import SetPassword from './SetPassword';
import EmailConfirm from './EmailConfirm';

const Auth = () => {
    const { path } = useRouteMatch();

    const routes = [
        { path: `${path}/login`, component: Login },
        { path: `${path}/recover-password`, component: RecoverPassword },
        { path: `${path}/register`, component: Register },
        { path: `${path}/set-password`, component: SetPassword },
        { path: `${path}/confirm`, component: EmailConfirm },
    ];

    return (
        <AuthWrapper>
            <AuthContent>
                <Switch>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            component={route.component}
                        />
                    ))}

                    <Redirect to={`${path}/login`} />
                </Switch>
            </AuthContent>
        </AuthWrapper>
    );
};

export default Auth;
