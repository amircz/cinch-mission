import axios from 'axios';
import {apiConfig} from "../config";

export const fetchEmailsFromServer = async (date?: string) => {
    try {
        const defaultTodayDate = new Date().toISOString().split('T')[0];
        const categorizeMailsFullURL: string = `${apiConfig.apiBaseUrl}${apiConfig.apiCategorizedMailsSuffix}`
        const response = await axios.get((categorizeMailsFullURL), {
            params: {date: date || defaultTodayDate}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching emails from server:', error);
        throw error;
    }
};
