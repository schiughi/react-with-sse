import React, { FC, useCallback, useEffect } from 'react';
import { Reset } from 'styled-reset';

import { Chat } from './components/Chat';
import * as Layout from './components/Layout';
import { Form } from './components/TextForm';
import { useStore, Action } from './store';
import { initializeWorker, sendMessage } from './adapter';

type OnSubmit = Parameters<typeof Form>[0]['onSubmit'];

export const App: FC = () => {
  const [store, dispatch] = useStore();

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') {
        return;
      }
      const action: Action = e.data;
      dispatch(action);
    };
    initializeWorker(listener).then(() => {
      sendMessage({ type: '@worker/GENERATE' });
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
    sendMessage({
      type: '@worker/SEND_MESSAGE',
      payload
    });
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
