import { RefObject, useEffect, useRef } from "react";

export const useOutsideClick = (callback: any): any => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);

    return ref;
};
