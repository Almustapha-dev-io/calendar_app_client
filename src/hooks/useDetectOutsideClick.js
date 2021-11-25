import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const useDetectOutsideClick = () => {
    const ref = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const pageClickEvent = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setActive(prev => !prev);
            }
        }

        if (active) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => window.removeEventListener('click', pageClickEvent);
    });

    return {active, ref, setActive};
};

export default useDetectOutsideClick;