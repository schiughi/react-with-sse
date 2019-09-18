import { generateEventSource } from './EventSource';
import { post } from './REST';
import { dispatch } from './messenger';
import { db, Message } from './IndexedDB';

type Action =
  | {
      type: 'generate';
    }
  | {
      type: 'send';
      payload: object;
    };

self.addEventListener('message', message => {
  if (!message.data || typeof message.data !== 'string') {
    return;
  }
  const action: Action = JSON.parse(message.data);
  switch (action.type) {
    case 'send': {
      post('/api/messages', action.payload);
    }
    case 'generate': {
      generateEventSource().then(() => {
        db.messages
          .orderBy('date')
          .limit(10)
          .toArray()
          .then(messages => {
            dispatch({ type: 'messages', payload: { messages } });
          });
      });
    }
  }
});
