import { generateEventSource } from './EventSource';
import { post } from './REST';
import { dispatch } from './messenger';
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

self.addEventListener('message', async message => {
  if (!message.data || typeof message.data !== 'string') {
    return;
  }
  const action: Action = JSON.parse(message.data);
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
      return dispatch({
        type: '@client/RECEIVE_MESSAGES',
        payload: { messages }
      });
    }
  }
});
