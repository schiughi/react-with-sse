import React, { FC } from 'react';
import ReactDOM from 'react-dom';

const Index: FC = () => <div>Hello React!</div>;

const es = new EventSource('/api/stream');
es.addEventListener('open', () => {
  console.log('opend!');
});

es.addEventListener('error', e => {
  console.error('es error', e);
});

es.addEventListener('date', date => {
  console.log(date);
});

ReactDOM.render(<Index />, document.getElementById('root'));
