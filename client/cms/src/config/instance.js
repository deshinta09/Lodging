import axios from 'axios'

const serverUrl = 'https://server.deshinta.online'
const instance = axios.create({baseURL:serverUrl})

export default instance