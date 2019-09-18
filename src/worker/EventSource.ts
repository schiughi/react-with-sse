import { db, Message } from './IndexedDB';
import { dispatch } from './messenger';

interface Event {
  lastEventId: number;
  data: string;
}

type Listeners = {
  [key: string]: (e: Event) => void;
};

const generateEventSourceHandlers = (url: string, listeners: Listeners) =>
  new Promise<EventSource>((resolve, reject) => {
    const es = new EventSource(url);
    Object.entries(listeners).forEach(([key, func]) => {
      // @ts-ignore
      es.addEventListener(key, func);
    });

    es.addEventListener('open', () => {
      resolve(es);
    });

    es.addEventListener('error', e => {
      reject(e);
    });
  });

export const generateEventSource = () =>
  generateEventSourceHandlers('/api/stream', {
    arrival: e => {
      const message: Message = JSON.parse(e.data);
      db.messages.add(message).then(id => {
        dispatch({
          type: '@client/RECEIVE_MESSAGE',
          payload: { ...message, id }
        });
      });
    }
  });
