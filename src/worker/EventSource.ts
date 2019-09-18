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
      const data = JSON.parse(e.data);
      const message = {
        id: e.lastEventId,
        ...data
      };
      self.postMessage(JSON.stringify({ type: 'message', payload: message }));
    }
  });
