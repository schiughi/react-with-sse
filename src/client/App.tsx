import React, { FC, useState, useCallback, useEffect } from 'react';
import { Reset } from 'styled-reset'

import { Chat } from "./Chat";
import * as Layout from "./Layout";
import { Form } from './TextForm';

const mockValues = [{
  id: 123,
  name: "hoge",
  date: new Date().toLocaleDateString(),
  content: "Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.",
  avatar: "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg",
},
{
  id: 65363,
  name: "fuga",
  date: new Date().toLocaleDateString(),
  content: "wow",
  avatar: "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg",
}]

type Messages = Parameters<typeof Chat>[0]["messages"];
type OnSubmit = Parameters<typeof Form>[0]["onSubmit"];

export const App: FC = () => {
  const [messages, setMessages] = useState<Messages>(mockValues);
  useEffect(() => {
    const worker = new Worker('worker.js');
    worker.postMessage('generate');
    worker.addEventListener('message', (e: MessageEvent) => {
      console.log(e);
      const newMessage = JSON.parse(e.data) as Messages[0];
      setMessages(prev => [...prev, newMessage])
    });
  }, []);

  const handleSubmit = useCallback<OnSubmit>((content) => {
    fetch("/api/messages", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        name: "hoge",
        content,
        date: Date.now(),
        avatar: "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg"
      }),
    })
  },[]);

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
