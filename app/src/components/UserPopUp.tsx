import React, { useCallback, useState } from 'react';

import { useStorage } from '../hooks/use-storage';

import styles from './UserPopUp.module.scss';

const UserPopUp = () => {
    const [ user, setUser ] = useState('');

    const { set } = useStorage();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setUser(event.target.value);
        },
        [],
    );

    const handleSubmit = useCallback(
        () => {
            set('user', { name: user });
            window.location.reload();
        },
        [ set, user ],
    );

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <h2>Enter your username:</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} value={user} />
                </form>
            </div>
        </div>
    );
};

export default UserPopUp;
