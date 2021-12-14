import Http from './http';

export default new Http();

export const basicUrl = process.env.BACKEND_SERVER_URL || 'http://localhost:8080';
