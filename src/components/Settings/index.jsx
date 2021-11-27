import React, { useContext } from 'react';

import ChangeEmail from './ChangeEmail';

import { SettingsContext } from 'context/settings-context';
import { CenterInParent, SettingsContainer } from 'components/ui/PageWrapper';
import { SecondaryButton } from 'components/ui/StyledButton';

const Settings = () => {
    const { setChangePassword, setChangeEmail } = useContext(SettingsContext);
    const btnStyle = { width: '100%', marginBottom: '15px' };

    return (
        <CenterInParent>
            <SettingsContainer>

                <ChangeEmail />
                
                <h2>User Settings</h2>
                <SecondaryButton
                    style={btnStyle}
                    onClick={() => setChangePassword(true)}
                >
                    Change your password
                </SecondaryButton>

                <SecondaryButton
                    style={btnStyle}
                    onClick={() => setChangeEmail(true)}
                >
                    Change your email
                </SecondaryButton>
            </SettingsContainer>
        </CenterInParent>
    );
};

export default Settings;
