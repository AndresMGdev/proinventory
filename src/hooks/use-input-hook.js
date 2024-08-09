import { useState  } from "react";

export const useInputHook = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');
    return {
        value,
        setValue,
        error,
        setError,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
                setError('');
            }
        }
    }
};