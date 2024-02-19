import { useState, useEffect } from 'react';

export const useHasMounted = (): boolean => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
};
