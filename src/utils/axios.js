import axios from 'axios';
const link = process.env.REACT_APP_AXIOS_LINK;

const customFetch = axios.create({
  baseURL: link,
});

export default customFetch;
