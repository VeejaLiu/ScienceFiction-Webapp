import Http from './http';

export default new Http();

export const basicUrl = process.env.REACT_APP_REST_BASE_URL || 'http://localhost:8080/';
