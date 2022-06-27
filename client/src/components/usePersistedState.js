import {useState, useEffect} from 'react';

const usePersistedState = (defaultValue, name) => {

    const [state, setState] = useState(() => {
        const storedValue = window.localStorage.getItem(name);

        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    })

    useEffect(() => {
        window.localStorage.setItem(name, JSON.stringify(state));
    }, [state])

    return [state, setState];
}

export default usePersistedState;