import React, { useCallback, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { removeEvent } from 'store/actions';
import Alert from 'components/Alert';
import Spinner from 'components/ui/Spinner';
import SidePanel from 'components/SidePanel';
import { DetailRow } from 'components/ui/StyledInput';
import AddEvent from 'components/Event/AddEvent';
import { DangerButton, PrimaryButton } from 'components/ui/StyledButton';
import { PRIMARY } from 'util/styles/colors';
import showToast from 'util/helpers/showToast';
import { deleteAppointment } from 'services/appointments';
import { EventContext } from 'context/event-context';

const ViewEvent = () => {
    const [state, setState] = useState({
        showAlert: false,
        loading: false,
    });
    const dispatch = useDispatch();
    const { event, setEvent, setDate } = useContext(EventContext);
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
        setState((_) => ({ ...state, loading: true, showAlert: false }));

        const id = event._id;
        deleteAppointment(id, token)
            .then((res) => {
                dispatch(removeEvent({ id, month, year }));
                showToast('Event deleted!', 'success');
                setState((_) => ({ ...state, loading: false }));
                setEvent(null);
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

                <PrimaryButton
                    onClick={() => setDate({ dateString: `${year}-${month}` })}
                    style={{ marginLeft: '15px' }}
                >
                    Edit
                </PrimaryButton>
            </>
        );
    }

    return (
        <SidePanel
            close={() => setEvent(null)}
            title="Event details"
            show={event ? true : false}
            actions={actions}
            hideClose={state.loading}
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

            <AddEvent />

            {event && (
                <>
                    <DetailRow>
                        <label>Title</label>
                        <p>{event.title}</p>
                    </DetailRow>

                    <DetailRow>
                        <label>Details</label>
                        <p>
                            {event.details
                                ? event.details
                                : 'This event does not have any details'}
                        </p>
                    </DetailRow>

                    <DetailRow>
                        <label>Event date</label>
                        <p>
                            {dayjs(event.appointmentDate).format(
                                'MMMM DD, YYYY'
                            )}
                        </p>
                    </DetailRow>
                </>
            )}
        </SidePanel>
    );
};

export default ViewEvent;
