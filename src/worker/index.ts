import { generateEventSource } from './EventSource';
import { post } from './REST';

self.addEventListener('message', message => {
  if (typeof message.data !== 'string') {
    return;
  }
  const action = JSON.parse(message.data);
  switch (action.type) {
    case 'generate': {
      generateEventSource().then(() => {
        self.postMessage(JSON.stringify({ type: 'generated' }));
      });
    }
    case 'send': {
      post('/api/messages', action.payload);
    }
  }
});
