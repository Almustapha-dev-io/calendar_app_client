import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { removeEvent } from 'store/actions';
import Alert from 'components/Alert';
import Spinner from 'components/ui/Spinner';
import SidePanel from 'components/SidePanel';
import { DetailRow } from 'components/ui/StyledInput';
import { DangerButton, PrimaryButton } from 'components/ui/StyledButton';
import { PRIMARY } from 'util/styles/colors';
import showToast from 'util/helpers/showToast';
import { deleteAppointment } from 'services/appointments';

const ViewEvent = (props) => {
    const [state, setState] = useState({
        showAlert: false,
        loading: false,
    });
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { month, year } = useSelector((state) => state.calendar);

    const handleError = useCallback((err) => {
        let errMessage = 'An unexpected error occured!';
        if (err.response) {
            const { data } = err.response;
            errMessage = data.message;
        }

        showToast(errMessage, 'error');
        setState((state) => ({ ...state, loading: false }));
    }, []);

    const deleteEvent = () => {
        setState((_) => ({ ...state, loading: true }));

        const id = props.event._id;
        deleteAppointment(id, token)
            .then((res) => {
                dispatch(removeEvent({ id, month, year }));
                showToast('Event deleted!', 'success');
                setState((_) => ({ ...state, loading: false, showAlert: false }));
                props.close();
            })
            .catch(handleError);
    };

    const toggleAlert = (showAlert) => {
        setState((state) => ({ ...state, showAlert }));
    };

    let actions = <Spinner strokeColor={PRIMARY} />;
    if (!state.loading) {
        actions = (
            <>
                <DangerButton onClick={() => toggleAlert(true)}>
                    Remove
                </DangerButton>

                <PrimaryButton style={{ marginLeft: '15px' }}>
                    Edit
                </PrimaryButton>
            </>
        );
    }

    return (
        <SidePanel
            close={props.close}
            title="Event details"
            show={props.event ? true : false}
            actions={actions}
        >
            <Alert
                show={state.showAlert}
                title="Delete Event"
                onClose={() => toggleAlert(false)}
                closeText="No, dont"
                onConfirm={deleteEvent}
                confirmText="Please, do"
            >
                Are you sure you want to delete this event?
            </Alert>

            {props.event && (
                <>
                    <DetailRow>
                        <label>Title</label>
                        <p>{props.event.title}</p>
                    </DetailRow>

                    <DetailRow>
                        <label>Details</label>
                        <p>
                            {props.event.details
                                ? props.event.details
                                : 'This event does not have any details'}
                        </p>
                    </DetailRow>

                    <DetailRow>
                        <label>Event date</label>
                        <p>
                            {dayjs(props.event.appointmentDate).format(
                                'MMMM DD, YYYY'
                            )}
                        </p>
                    </DetailRow>
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
