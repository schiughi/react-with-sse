type Options = Parameters<typeof self.postMessage>[1];

export const dispatch = (value: object, options?: Options) => {
  console.log('dispatch', value);
  self.postMessage(JSON.stringify(value), options);
};
