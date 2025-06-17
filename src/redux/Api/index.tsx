import axios from 'axios';

// Define a type for base URL (optional for better typing)
interface BaseUrl {
    url: string;
}

// Base URL object
export const base_url: BaseUrl = {
    url: 'https://server-php-8-3.technorizen.com/ScrapApp/api/',
};

// Axios instance with base URL
export const API = axios.create({
    baseURL: 'https://server-php-8-3.technorizen.com/ScrapApp/api/',
});

export const MapApiKey = 'AIzaSyDYAVjajEQU7MG7qb6jhPf5nelAWhijtyo';  // apna google api key yaha dalein
export const DirectionKey = "AIzaSyDYAVjajEQU7MG7qb6jhPf5nelAWhijtyo"
