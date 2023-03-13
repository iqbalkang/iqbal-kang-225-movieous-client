import axios from 'axios'
const dev = 'http://127.0.0.1:8080/api/v1'
const DOURL = 'https://movieous-server-2-3odfp.ondigitalocean.app/api/v1'
const customFetch = axios.create({
  baseURL: DOURL,
})

export default customFetch
