import React, { FC, useCallback, useEffect } from 'react';
import { Reset } from 'styled-reset';

import { Chat } from './Chat';
import * as Layout from './Layout';
import { Form } from './TextForm';
import { useStore, Action } from './store';

type OnSubmit = Parameters<typeof Form>[0]['onSubmit'];

const worker = new Worker('worker.js');

export const App: FC = () => {
  const [store, dispatch] = useStore();

  useEffect(() => {
    worker.postMessage(JSON.stringify({ type: '@worker/GENERATE' }));
    worker.addEventListener('message', (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'string') {
        return;
      }
      const action = JSON.parse(e.data) as Action;
      dispatch(action);
    });
  }, []);

  const handleSubmit = useCallback<OnSubmit>(content => {
    const payload = {
      name: 'hoge',
      content,
      date: Date.now(),
      avatar:
        'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg'
    };
    worker.postMessage(
      JSON.stringify({
        type: '@worker/SEND_MESSAGE',
        payload
      })
    );
  }, []);

  return (
    <Layout.Grid>
      <Reset />
      <Layout.Chat>
        <Chat messages={store.messages} />
      </Layout.Chat>
      <Layout.Form>
        <Form onSubmit={handleSubmit} />
      </Layout.Form>
    </Layout.Grid>
  );
};
