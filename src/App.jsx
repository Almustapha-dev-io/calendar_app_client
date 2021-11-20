import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'pages/Auth';

const App = () => {
    const routes = [];

    return (
        <Switch>
            <Route path="/auth" component={Auth} />
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    render={(props) =>
                        route.lazy ? (
                            <Suspense fallback={<p>Loading</p>}>
                                <route.component {...props} />
                            </Suspense>
                        ) : (
                            <route.component {...props} />
                        )
                    }
                />
            ))}

            {/* <Redirect from="/" to="/auth" exact /> */}
            <Redirect to="/auth" />
        </Switch>
    );
};

export default App;
