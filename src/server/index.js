import express from 'express';
import path from 'path';
import SSE from 'express-sse';

const app = express();

app.use(express.static(path.join('./', 'dist')));

const sse = new SSE('handshaked!', { isSerialized: false });

app.get('/api', (req, res) => {
  res.send({ api: 'test' });
});

app.get('/api/stream', (req, res) => {
  sse.init(req, res);
  setInterval(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    sse.send(new Date().toLocaleString(), 'date');
  }, 10000);
});

app.get('*', (req, res) => {
  res.sendFile(path.join('./', 'dist', 'index.html'));
});

app.listen(3003, () => {
  console.log('server running');
});
