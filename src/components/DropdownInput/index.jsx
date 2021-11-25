import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useDetectOutsideClick from 'hooks/useDetectOutsideClick';
import {
    InputDropdownContainer,
    InputDropdownItem,
    InputDropdownItems,
    Input,
} from 'components/ui/StyledInput';

const DropdownInput = (props) => {
    const { active, setActive, ref } = useDetectOutsideClick();
    const [state, setState] = useState({
        value: '',
        display: '',
        filteredList: [],
    });

    const initialValueSet = useRef(false);

    useEffect(() => {
        let filteredList = props.items;

        if (!props.filterList) {
            filteredList = props.items.map((it) => ({ ...it }));
        }

        setState((state) => ({
            ...state,
            filteredList,
        }));
    }, [props.filterList, props.initialValue, props.items]);

    useEffect(() => {
        if (
            props.items.length &&
            !initialValueSet.current &&
            props.initialValue
        ) {
            const display = props.items.find(
                (it) => it.value === props.initialValue
            ).display;

            setState((state) => ({
                ...state,
                value: props.initialValue,
                display,
            }));
        }
    }, [props.initialValue, props.items]);

    const inputChangeHandler = (value) => {
        const updatedList = props.items.filter((i) =>
            i.display.toLowerCase().includes(value.toLowerCase())
        );

        setState((state) => ({
            ...state,
            display: value,
            filteredList: props.filterList ? updatedList : state.filteredList,
        }));

        if (!active) {
            setActive((prev) => true);
        }
    };

    const inputClickHandler = () => {
        let updatedList = props.items.map((it) => ({ ...it }));
        if (state.display) {
            updatedList = props.items.filter((i) =>
                i.display.toLowerCase().includes(state.display.toLowerCase())
            );
        }

        setState((state) => ({
            ...state,
            filteredList: props.filterList ? updatedList : state.filteredList,
        }));

        setActive((prev) => !prev);
    };

    const itemSelectedHandler = (item) => {
        setState((state) => ({
            ...state,
            filteredList: [],
            value: item.value,
            display: item.display,
        }));

        props.setValue(item.value);
    };

    return (
        <InputDropdownContainer style={props.styleX}>
            <Input
                placeholder={props.placeholder}
                value={state.display}
                onClick={inputClickHandler}
                onChange={(e) => inputChangeHandler(e.target.value)}
            />
            {active && (
                <InputDropdownItems ref={ref} className="custom-scroll">
                    {!state.filteredList.length && (
                        <>
                            {state.display ? (
                                <InputDropdownItem>
                                    No item found
                                </InputDropdownItem>
                            ) : (
                                <InputDropdownItem>
                                    Type to filter
                                </InputDropdownItem>
                            )}
                        </>
                    )}
                    {state.filteredList.map((item) => (
                        <InputDropdownItem
                            className={
                                item.value === state.value ? 'selected' : ''
                            }
                            onClick={() => itemSelectedHandler(item)}
                            key={item.value}
                        >
                            {item.display}
                        </InputDropdownItem>
                    ))}
                </InputDropdownItems>
            )}
        </InputDropdownContainer>
    );
};

DropdownInput.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            display: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
        })
    ),
    setValue: PropTypes.func.isRequired,
    styleX: PropTypes.object,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    filterList: PropTypes.bool,
};

export default DropdownInput;
