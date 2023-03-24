import axios from 'axios'
const dev = 'http://127.0.0.1:8080/api/v1'
const prod = 'ec2-18-118-24-122.us-east-2.compute.amazonaws.com'
const customFetch = axios.create({
  baseURL: prod,
})

export default customFetch
