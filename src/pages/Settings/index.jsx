import React from 'react';
import Settings from 'components/Settings';
import SettingsContextProvider from 'context/settings-context';

const SettingsPage = () => {
    return (
        <SettingsContextProvider>
            <Settings />
        </SettingsContextProvider>
    );
};

export default SettingsPage;
