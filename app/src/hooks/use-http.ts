import { useCallback, useMemo } from 'react';
import axios from 'axios';

import { BASE_URL } from '../common/global-constants';

const useHttp = (url: string, isExternal = false) => {
    const internalUrl = useMemo(
        () => isExternal
            ? url
            : `http://${BASE_URL}/api${url}`,
        [ isExternal, url ],
    );

    const get = useCallback(
        async () => {
            const { data } = await axios.get(internalUrl);
            return data;
        },
        [ internalUrl ],
    );

    const post = useCallback(
        async (body: any) => {
            const { data } = await axios.post(internalUrl, body);
            return data;
        },
        [ internalUrl ],
    );

    return { get, post };
};

export {
    // eslint-disable-next-line import/prefer-default-export
    useHttp,
};
