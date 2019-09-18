import express from 'express';
import path from 'path';
import SSE from 'express-sse';
import bodyParser from 'body-parser';

const app = express();
const sse = new SSE('handshaked!', { isSerialized: false });

app.use(express.static(path.join('./', 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
  res.send({ api: 'test' });
});

app.get('/api/stream', sse.init);

app.post('/api/messages', req => {
  console.log(req.body);
  // @ts-ignore
  sse.send(req.body, 'arrival');
});

app.get('*', (req, res) => {
  res.sendFile(path.join('./', 'dist', 'index.html'));
});

app.listen(3003, () => {
  console.log('server running');
});
