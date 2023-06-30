import axios from 'axios';

const customAxiosFetch = axios.create({
    baseURL: 'http://localhost:5173/api/v1'
  });

export default customAxiosFetch;
