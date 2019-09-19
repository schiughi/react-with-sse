let worker: Worker | null = null;

export const initializeWorker = async (
  eventListner: (e: MessageEvent) => void
) => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('worker.js');
      console.log(
        `ServiceWorker registration successful with scope: ${registration.scope}`
      );
      navigator.serviceWorker.addEventListener('message', eventListner);
    } catch (e) {
      console.error(`ServiceWorker registration failure`, e);
    }
  } else {
    worker = new Worker('worker.js');
  }
};

export const sendMessage = (value: object) => {
  if ('serviceWorker' in navigator) {
    const serviceWorker = navigator.serviceWorker.controller;
    serviceWorker && serviceWorker.postMessage(value);
  } else {
    worker && worker.postMessage(value);
  }
};
