import { generateEventSource } from './EventSource';
import { post } from './REST';
import { sendMessage } from './messenger';
import { db } from './IndexedDB';

const GENERATE = '@worker/GENERATE' as const;
const SEND_MESSAGE = '@worker/SEND_MESSAGE' as const;

type Action =
  | {
      type: typeof GENERATE;
    }
  | {
      type: typeof SEND_MESSAGE;
      payload: object;
    };

self.addEventListener('install', (event: unknown) => {
  // @ts-ignore
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: unknown) => {
  // @ts-ignore
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', async message => {
  if (!message.data || typeof message.data !== 'object') {
    return;
  }
  const action: Action = message.data;
  switch (action.type) {
    case SEND_MESSAGE:
      return post('/api/messages', action.payload);
    case GENERATE: {
      await generateEventSource();
      const messages = await db.messages
        .orderBy('date')
        .reverse()
        .limit(10)
        .toArray();
      return sendMessage({
        type: '@client/RECEIVE_MESSAGES',
        payload: { messages }
      });
    }
  }
});
