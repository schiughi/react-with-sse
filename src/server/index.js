import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join('./', 'dist')));

app.get('/api', (req, res) => {
  res.send({ api: 'test' });
});

app.get('*', function(req, res) {
  res.sendFile(path.join('./', 'dist', 'index.html'));
});

app.listen(3003, () => {
  console.log('server running');
});
