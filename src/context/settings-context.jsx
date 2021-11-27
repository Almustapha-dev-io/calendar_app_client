import React, { useCallback, useState } from 'react';

export const SettingsContext = React.createContext({
    changePassword: false,
    changeEmail: false,
    setChangePassword: () => {},
    setChangeEmail: () => {},
});

const SettingsContextProvider = (props) => {
    const [state, setState] = useState({
        changePassword: false,
        changeEmail: false,
    });

    const setChangePasswordHandler = useCallback((value) => {
        setState((state) => ({ ...state, changePassword: value }));
    }, []);

    const setChangeEmailHandler = useCallback((value) => {
        setState((state) => ({ ...state, changeEmail: value }));
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                changePassword: state.changePassword,
                changeEmail: state.changeEmail,
                setChangeEmail: setChangeEmailHandler,
                setChangePassword: setChangePasswordHandler
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
