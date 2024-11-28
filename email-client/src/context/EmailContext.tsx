import React, { createContext, useContext, useEffect, useState } from 'react';
import CategorizedMail from '../types/CategorizedMail';
import { fetchEmailsFromServer } from '../services/mails.service'; // Service function to fetch emails from server

// Create the context
interface EmailContextType {
    emails: CategorizedMail[];
    syncTime: string;
    isLoading: boolean;
    refreshEmails: (date?: string) => void; // Function to refresh emails with optional date parameter
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
    const fetchData = async (date?: string) => {
        setIsLoading(true); // Set loading to true when fetching

        try {
            const data = await fetchEmailsFromServer(date); // Pass the date to the service function
            setEmails(data.mails);
            setSyncTime(data.syncTime);
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setIsLoading(false); // Set loading to false when done fetching
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch when the app loads (default to today's date)
    }, []); // Empty dependency array to trigger this only once at the start

    // Function to refresh emails with an optional date
    const refreshEmails = (date?: string) => {
        fetchData(date); // Trigger the fetch again with the specified date
    };

    return (
        <EmailContext.Provider value={{ emails, isLoading, syncTime, refreshEmails }}>
            {children}
        </EmailContext.Provider>
    );
};

// Custom hook to use the context
export const useEmails = () => useContext(EmailContext);
