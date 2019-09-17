interface Event {
  lastEventId: number;
  data: string;
}

const generateEventSource = (
  url: string
) =>
  new Promise<EventSource>((resolve, reject) => {
    const es = new EventSource(url);
    es.addEventListener('open', () => {
      resolve(es);
    });

    es.addEventListener('error', (e) => {
      reject(e);
    });
  });

self.addEventListener('message', message => {
  switch(message.data) {
    case "generate": {
      generateEventSource('/api/stream').then(es => {
        es.addEventListener("arrival", (e: Event) => {
          const data = JSON.parse(e.data);
          const message = {
            id: e.lastEventId,
            ...data,
          }
          self.postMessage(JSON.stringify(message));
        })
      })
    }
  }
});
