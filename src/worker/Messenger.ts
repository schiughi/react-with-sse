type Options = Parameters<typeof self.postMessage>[1];

export const sendMessage = (value: object, options?: Options) => {
  console.log('sendMessage', value);
  if ('postMessage' in self) {
    self.postMessage(value, options);
  } else {
    // @ts-ignore
    self.clients.matchAll().then((clients: Client[]) => {
      clients.forEach(client => {
        client.postMessage(value);
      });
    });
  }
};
