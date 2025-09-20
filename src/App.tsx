import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { type NotificationPayload } from 'firebase/messaging';
import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { firebaseConfig, vapidKey } from './config';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
};

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<NotificationPayload | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getToken(messaging, { vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('トークンを取得しました。', currentToken);
        } else {
          console.log('トークンが利用できません。');
          requestPermission();
        }
      })
      .catch((err) => {
        console.log('トークンの取得に失敗しました。', err);
      });
  }, []);

  useEffect(() => {
    const unregisterFunc = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if (payload.notification) {
        setMessage(payload.notification);
        setOpen(true);
      }
    });
    return () => unregisterFunc();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          <AlertTitle>{message?.title}</AlertTitle>
          {message?.body}
        </Alert>
      </Snackbar >
    </>
  )
}

export default App
