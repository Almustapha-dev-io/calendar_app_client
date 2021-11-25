import React from 'react';
import { useHistory } from 'react-router-dom';

import { CenteredWrapper } from 'components/ui/PageWrapper';
import { PrimaryButton } from 'components/ui/StyledButton';
import notFoundSvg from 'assets/svg/notFound.svg';

const PageNotFound = () => {
    const { goBack } = useHistory();

    return (
        <CenteredWrapper>
            <img
                src={notFoundSvg}
                alt="Page not found"
                style={{ maxHeight: '400px' }}
            />

            <PrimaryButton onClick={goBack}>Go back</PrimaryButton>
        </CenteredWrapper>
    );
};

export default PageNotFound;
