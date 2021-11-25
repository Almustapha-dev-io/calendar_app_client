import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from 'pages/Auth';
import Logout from 'pages/Logout';
import PageNotFound from 'pages/PageNotFound';
import Loader from 'components/ui/Loader';

const Main = React.lazy(() => import('pages/Main'));
const App = () => {
    const isAuth = useSelector((state) =>
        state.auth.token && state.auth.userInfo ? true : false
    );

    const routes = [
        { path: '/app', component: Main, lazy: true },
        { path: '/logout', component: Logout, lazy: false },
        { path: '/page-not-found', component: PageNotFound, lazy: false },
    ];

    return (
        <Switch>
            <Route path="/auth" component={Auth} />
            
            {!isAuth && <Redirect to="/auth" />}

            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    render={(props) =>
                        route.lazy ? (
                            <Suspense fallback={<Loader />}>
                                <route.component {...props} />
                            </Suspense>
                        ) : (
                            <route.component {...props} />
                        )
                    }
                />
            ))}

            <Redirect from="/" to="/auth" exact />
            <Redirect to="/page-not-found" />
        </Switch>
    );
};

export default App;
