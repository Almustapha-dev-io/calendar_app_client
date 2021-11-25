import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton } from 'components/ui/StyledButton';
import mailbox from 'assets/svg/mailbox.svg';

const EmailConfirm = (props) => {
    const { push } = useHistory();

    return (
        <>
            <h2>Email confirmation</h2>

            <img
                src={mailbox}
                alt="mailbox-animate"
                style={{ maxHeight: '300px' }}
            />

            <p style={{ lineHeight: '1rem', textAlign: 'center' }}>
                We just sent a verification mail to your email address. If you
                don't get a mail from us, please retry.
            </p>

            <SecondaryButton
                onClick={() => push('/auth/login')}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                Back to login
            </SecondaryButton>
        </>
    );
};

export default EmailConfirm;