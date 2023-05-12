import React, { useCallback, useState } from 'react';
import isNil from 'lodash/isNil';

import useChat from '../hooks/use-chat';
import { useStorage } from '../hooks/use-storage';

import MessagesList from './MessagesList';
import UserPopUp from './UserPopUp';

import styles from './Chats.module.scss';

const Chats = () => {
    const [ newMessageText, setNewMessageText ] = useState('');

    const { get } = useStorage();
    const currentUser = get('user');

    const { send, messages } = useChat();

    const handleSendMessage = useCallback(
        (ev: any) => {
            ev.preventDefault();
            send(newMessageText);
            setNewMessageText('');
            return false;
        },
        [ newMessageText, send ],
    );

    if (isNil(currentUser)) {
        return <UserPopUp />;
    }

    return (
        <div className={styles.chatContainer}>
            <h1>
                Hello,
                {currentUser.name}
            </h1>
            <div className={styles.chatMessages}>
                <MessagesList messages={messages} />
            </div>
            <div className={styles.chatLine}>
                <form onSubmit={(ev) => handleSendMessage(ev)}>
                    <input
                      className="form-control"
                      type="text"
                      value={newMessageText}
                      onChange={(ev) => setNewMessageText(ev.target.value)}
                    />
                    <button type="submit" className="btn btn-success">Click</button>
                </form>
            </div>
        </div>
    );
};

export default Chats;
