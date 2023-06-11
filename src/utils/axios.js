import axios from 'axios';

const customFetch = axios.create({
  // baseURL: 'http://3.101.140.214/api/v1',
  baseURL: 'http://54.219.114.236/api/v1',
});

export default customFetch;
