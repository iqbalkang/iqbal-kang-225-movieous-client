import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'https://movieous-server-2-3odfp.ondigitalocean.app/api/v1',
})

export default customFetch
