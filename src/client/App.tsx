import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { Reset } from 'styled-reset';

import { Chat } from './Chat';
import * as Layout from './Layout';
import { Form } from './TextForm';

type Messages = Parameters<typeof Chat>[0]['messages'];
type OnSubmit = Parameters<typeof Form>[0]['onSubmit'];

type Action =
  | {
      type: 'message';
      payload: Messages[0];
    }
  | {
      type: 'messages';
      payload: {
        messages: Messages;
      };
    };

export const App: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker('worker.js');
    workerRef.current.postMessage(JSON.stringify({ type: 'generate' }));
    workerRef.current.addEventListener('message', (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'string') {
        return;
      }
      const action = JSON.parse(e.data) as Action;
      switch (action.type) {
        case 'message':
          setMessages(prev => [...prev, action.payload]);
        case 'messages':
          setMessages(prev => [...prev, ...action.payload.messages]);
      }
    });
  }, []);

  const handleSubmit = useCallback<OnSubmit>(
    content => {
      const payload = {
        name: 'hoge',
        content,
        date: Date.now(),
        avatar:
          'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg'
      };
      workerRef.current &&
        workerRef.current.postMessage(
          JSON.stringify({
            type: 'send',
            payload
          })
        );
    },
    [workerRef]
  );

  return (
    <Layout.Grid>
      <Reset />
      <Layout.Chat>
        <Chat messages={messages} />
      </Layout.Chat>
      <Layout.Form>
        <Form onSubmit={handleSubmit} />
      </Layout.Form>
    </Layout.Grid>
  );
};
