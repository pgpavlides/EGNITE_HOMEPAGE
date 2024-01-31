import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('basic-scene')).render(
  <Suspense>
    <App />
  </Suspense>
);
