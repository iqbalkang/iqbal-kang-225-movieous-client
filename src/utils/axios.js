import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'https://movieous-server-o28i8.ondigitalocean.app//api/v1',
})

export default customFetch
