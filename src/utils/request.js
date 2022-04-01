import axios from 'axios' 

export const host = 'http://192.168.0.115:8082'
export const apiUrl = host+'/api'

// 创建axios实例:创建一个类似与axios的对象
const instance = axios.create({
    baseURL:apiUrl,
})

export default instance
