import ApiError from './ApiError'
import { apiBase } from '@/config'

const get = (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

	return fetch(`${apiBase}/${endpoint}`, { ...defaultOptions, ...options })
		.then(async (resp) => {
			if(!resp.ok) {
				const err= await resp.json()

				throw new ApiError(err.status, err.message)
			}

			return resp.json()
		})
}

const post = (endpoint, body, options = {}) => {
    const defaultOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }

	return fetch(`${apiBase}/${endpoint}`, { ...defaultOptions, ...options })
		.then(async (resp) => {
			if(!resp.ok) {
				const err= await resp.json()

				throw new ApiError(err.status, err.message)
			}

			return resp.json()
		})
}

export {
	get,
	post
}
