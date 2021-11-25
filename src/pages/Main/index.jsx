import React, { Suspense } from 'react';
import { useRouteMatch, Switch, Redirect, Route } from 'react-router-dom';

import Navigation from 'components/Navigation';
import { MainWrapper, MainContent } from 'components/ui/PageWrapper';
import Loader from 'components/ui/Loader';

const Calendar = React.lazy(() => import('pages/Calendar'));

const Main = () => {
    const { path } = useRouteMatch();
    const routes = [{ path: `${path}/calendar`, component: Calendar }];

    return (
        <MainWrapper>
            <MainContent className="custom-scroll">
                <Switch>
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
                    <Redirect exact from={path} to={`${path}/calendar`} />
                    <Redirect to="/page-not-found" />
                </Switch>
            </MainContent>
            <Navigation />
        </MainWrapper>
    );
};

export default Main;
