import axios from 'axios';
import CategorizedMailsResponse from "../types/CategorizedMailsResponse";



// Fetch emails from the backend
export const fetchEmailsFromServer = async (): Promise<CategorizedMailsResponse> => {
    const response = await axios.get<CategorizedMailsResponse>('http://localhost:3001/mails/categorized'); // Update with your backend URL
    return response.data;
};