import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Keep your custom styles if needed
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
// Import Bootstrap CSS
import { SocketProvider } from './context/SocketContext'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; // Keep your custom styles if needed


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);