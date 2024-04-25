import { useEffect, useState } from 'react'
import { BASE_URL } from '../shared/constants'

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(`${BASE_URL}${url}`)
			.then((response) => {
				console.log('🦊 response', response)
				if (!response.ok) {
					throw Error('could not fetch the data for that resource')
				}
				return response.json()
			})
			.then((data) => {
				console.log('🦊 data', data)
				setData(data)
				setError(null)
			})
			.catch((err) => {
				console.log('🦊 err', err)
				setError(err.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [url])

	return { data, isLoading, error }
}
