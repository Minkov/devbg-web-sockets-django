const useStorage = () => {
    const get = (key: string) => {
        const { value } = JSON.parse(localStorage.getItem(key) || '{}');

        return value;
    };

    const set = (key: string, value: any) => {
        const obj = { value };

        return localStorage.setItem(key, JSON.stringify(obj));
    };

    return {
        get,
        set,
    };
};

// eslint-disable-next-line import/prefer-default-export
export { useStorage };
