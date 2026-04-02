import axios from 'axios'
import axiosRetry from 'axios-retry'
import { TIMEOUT } from './config'

const instance = axios.create({
	timeout: TIMEOUT,
})

// 请求拦截器

// 响应拦截器
instance.interceptors.response.use(
	(res) => {
		return res.data
	},
	(err) => {
		return Promise.reject(err)
	},
)

// Add retry functionality
axiosRetry(instance, {
	retries: 3,
	retryCondition: (error) => {
		return !error.response || (error.response.status >= 500 && error.response.status <= 599)
	},
	retryDelay: (retryCount) => {
		return retryCount * 1000
	},
})

export default instance
