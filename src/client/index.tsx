import React, { FC } from 'react';
import ReactDOM from 'react-dom';

const Index: FC = () => <div>Hello React!</div>;

fetch('/api/').then(response => {
  console.log(response.json());
});

ReactDOM.render(<Index />, document.getElementById('root'));
