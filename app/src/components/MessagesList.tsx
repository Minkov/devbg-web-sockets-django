import React from 'react';
import moment from 'moment';

import { IMessage } from '../hooks/use-chat';
import { useStorage } from '../hooks/use-storage';

import styles from './MessagesList.module.scss';

interface IMessagesListProps {
    messages: IMessage[];
}
const MessagesList = ({ messages }: IMessagesListProps) => {
    const { get } = useStorage();
    const currentUser = get('user');
    const { name } = currentUser;

    // eslint-disable-next-line camelcase
    const renderItem = ({ text, user, created_on }: IMessage, index: number) => {
        const className = user === name
            ? styles.currentUser
            : '';
        return (
            <li className={className} key={`message-${index}`}>
                <div className={styles.createdOn}>{moment(created_on).fromNow()}</div>
                <div className={styles.messageUser}>
                    {user}
                </div>

                <div className={styles.messageText}>
                    {text}
                </div>
            </li>
        );
    };

    return (
        <ul className={styles.messagesList}>
            {messages.map(renderItem)}
        </ul>
    );
};

export default MessagesList;
