import axios from 'axios'
const dev = 'http://127.0.0.1:8000/api/v1'
const prod = 'ec2-18-218-202-165.us-east-2.compute.amazonaws.com'
const customFetch = axios.create({
  baseURL: dev,
})

export default customFetch
