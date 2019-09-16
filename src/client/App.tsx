import React, { FC, useEffect, useState } from 'react';

export const App: FC = () => {
  const [values, setValues] = useState<string[]>([]);
  useEffect(() => {
    const worker = new Worker('worker.js');
    worker.postMessage('generate');
    worker.addEventListener('message', (e: MessageEvent) => {
      setValues(prev => [...prev, e.data]);
    });
  }, []);

  return (
    <div>
      {values.map(value => (
        <div key={value}>{value}</div>
      ))}
    </div>
  );
};
