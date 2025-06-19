import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/slices/tasks.slice';

const useDebounce = (value, delay) => {
    const [debouncedSearch, setDebouncedSearch] = useState(value);
    const dispatch = useDispatch();

    useEffect(() => {
        const handlerDebouncedSearch = setTimeout(() => {
            setDebouncedSearch(value);
        }, delay);

        return () => clearTimeout(handlerDebouncedSearch);
    }, [value, delay]);

    useEffect(() => {
        dispatch(fetchTasks(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    return debouncedSearch;
}

export default useDebounce;
