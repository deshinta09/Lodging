import axios from 'axios'

const serverSite = 'https://server.deshinta.online'
const instance = axios.create({baseURL:serverSite})

export default instance