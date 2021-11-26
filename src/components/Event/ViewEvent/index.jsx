import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import SidePanel from 'components/SidePanel';
import Alert from 'components/Alert';
import { DangerButton, PrimaryButton } from 'components/ui/StyledButton';

const Row = styled.div`
    width: 100%;
    margin: 0 0 1rem;

    label {
        display: block;
        color: #a1a1a1;
        font-size: 0.8rem;
        margin: 0;
    }

    p {
        margin: 0;
    }
`;
const ViewEvent = (props) => {
    const [alert, setAlert] = useState(false);

    const closeAlertHandler = useCallback(() => {
        setAlert(_ => false)
    }, []);

    const actions = (
        <>
            <DangerButton onClick={() => setAlert(_ => true)}>Remove</DangerButton>
            <PrimaryButton style={{ marginLeft: '15px' }}>Edit</PrimaryButton>
        </>
    );

    return (
        <SidePanel
            close={props.close}
            title="Event details"
            show={props.event ? true : false}
            actions={actions}
        >
            <Alert
                show={alert}
                title="Delete Event"
                onClose={closeAlertHandler}
                closeText="No, dont"
                onConfirm={() => setAlert((state) => ({ ...state, show: false }))}
                confirmText="Please, do"
            >
                Are you sure you want to delete this event?
            </Alert>

            {props.event && (
                <>
                    <Row>
                        <label>Title</label>
                        <p>{props.event.title}</p>
                    </Row>

                    <Row>
                        <label>Details</label>
                        <p>
                            {props.event.details
                                ? props.event.details
                                : 'This event does not have any details'}
                        </p>
                    </Row>

                    <Row>
                        <label>Event date</label>
                        <p>
                            {dayjs(props.event.appointmentDate).format(
                                'MMMM DD, YYYY'
                            )}
                        </p>
                    </Row>
                </>
            )}
        </SidePanel>
    );
};

ViewEvent.propTypes = {
    close: PropTypes.func.isRequired,
    event: PropTypes.object,
};

export default ViewEvent;
