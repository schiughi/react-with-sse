import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { Reset } from 'styled-reset';

import { Chat } from './Chat';
import * as Layout from './Layout';
import { Form } from './TextForm';

const mockValues = [
  {
    id: 123,
    name: 'hoge',
    date: new Date().toLocaleDateString(),
    content:
      "Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.",
    avatar:
      'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg'
  },
  {
    id: 65363,
    name: 'fuga',
    date: new Date().toLocaleDateString(),
    content: 'wow',
    avatar:
      'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg'
  }
];

type Messages = Parameters<typeof Chat>[0]['messages'];
type OnSubmit = Parameters<typeof Form>[0]['onSubmit'];

type Action =
  | {
      type: 'message';
      payload: Messages[0];
    }
  | {
      type: 'generated';
    };

export const App: FC = () => {
  const [messages, setMessages] = useState<Messages>(mockValues);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker('worker.js');
    workerRef.current.postMessage(JSON.stringify({ type: 'generate' }));
    workerRef.current.addEventListener('message', (e: MessageEvent) => {
      if (typeof e.data !== 'string') {
        return;
      }
      const action = JSON.parse(e.data) as Action;
      switch (action.type) {
        case 'message':
          setMessages(prev => [...prev, action.payload]);
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
