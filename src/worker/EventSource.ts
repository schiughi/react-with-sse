import { db, Message } from './IndexedDB';
import { sendMessage } from './messenger';

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
    arrival: async e => {
      const message: Message = JSON.parse(e.data);
      const id = await db.messages.add(message);
      sendMessage({
        type: '@client/RECEIVE_MESSAGE',
        payload: { ...message, id }
      });
    }
  });
