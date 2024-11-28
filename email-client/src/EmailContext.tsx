import React, { createContext, useContext, useEffect, useState } from 'react';
import CategorizedMail from './types/CategorizedMail';
import { fetchEmailsFromServer } from './services/mails.service';

// Create the context
interface EmailContextType {
    emails: CategorizedMail[];
    syncTime: string;
    isLoading: boolean;
    refreshEmails: () => void; // Function to refresh emails
}

const EmailContext = createContext<EmailContextType>({
    emails: [],
    syncTime: '',
    isLoading: true,
    refreshEmails: () => {}, // Default empty function
});

// Create a provider component
export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [emails, setEmails] = useState<CategorizedMail[]>([]);
    const [syncTime, setSyncTime] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); // Default to false for initial load

    // Function to fetch emails from the server
    const fetchData = async () => {
        setIsLoading(true);  // Set loading to true when fetching
        const data = await fetchEmailsFromServer();
        setEmails(data.mails);
        setSyncTime(data.syncTime);
        setIsLoading(false); // Set loading to false when done fetching
    };

    useEffect(() => {
        fetchData(); // Initial fetch when the app loads
    }, []); // Empty dependency array to trigger this only once at the start

    // Function to refresh emails
    const refreshEmails = () => {
        fetchData(); // Trigger the fetch again
    };

    return (
        <EmailContext.Provider value={{ emails, isLoading, syncTime, refreshEmails }}>
            {children}
        </EmailContext.Provider>
    );
};

// Custom hook to use the context
export const useEmails = () => useContext(EmailContext);
