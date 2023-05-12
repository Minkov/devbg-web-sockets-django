import { useCallback, useEffect, useMemo, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import isNil from 'lodash/isNil';

import { BASE_URL } from '../common/global-constants';

import { useHttp } from './use-http';
import { useStorage } from './use-storage';

interface IMessage {
    text: string;
    user: string;
    created_on: string;
}

const useChat = () => {
    const { get: getMessages } = useHttp('/chat/messages');
    const [ messages, setMessages ] = useState<IMessage[]>([]); // Sent and received messages.

    const socketUrl = `ws://${BASE_URL}/ws/chat/devbg`;
    const {
        sendMessage,
        lastMessage,
    } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        queryParams: { token: '4591645e14a8e5cc54a0bbc306f5ed1610cc2c17' },
    });

    useEffect(
        () => {
            (async () => {
                const newMessages = await getMessages();
                setMessages(newMessages as IMessage[]);
            })();
        },
        [ getMessages ],
    );

    useEffect(
        () => {
            const { data } = lastMessage || {};
            if (isNil(data)) {
                return;
            }
            setMessages((msgs) => [ ...msgs, JSON.parse(data) ]);
        },
        [ lastMessage ],
    );

    const { get } = useStorage();

    const user = useMemo(
        () => get('user'),
        [ get ],
    );

    const send = useCallback(
        (text: string) => {
            const { name } = user;
            sendMessage(JSON.stringify({
                text,
                user: name,
            }));
        },
        [ sendMessage, user ],
    );

    return { send, messages };
};

export default useChat;

export type {
    IMessage,
};
