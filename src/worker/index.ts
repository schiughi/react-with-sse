self.addEventListener('message', message => {
  if (message.data === 'generate') {
    const es = new EventSource('/api/stream');
    es.addEventListener('open', () => {
      console.log('opend!');
    });

    es.addEventListener('error', e => {
      console.error('es error', e);
    });

    es.addEventListener('date', (e: MessageEvent) => {
      const message = {
        id: e.lastEventId,
        data: e.data
      };
      console.log(message);
      self.postMessage(JSON.stringify(message));
    });
  }
});
