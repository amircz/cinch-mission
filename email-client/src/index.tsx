import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './components/MainPage/MainPage';
import { EmailProvider } from './context/EmailContext'; // Wrap entire MainPage with EmailProvider

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <EmailProvider>
            <MainPage />
        </EmailProvider>
    </React.StrictMode>
);
