import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
	BASE_URL,
	hasMoreTimePassedSinceThisDate,
	PODCAST_LIST_LOCAL_STORAGE_KEY,
	PODCAST_LIST_URL,
	PodcastListLocalStorage,
	useLoadingStore,
} from '../../shared'
import { PodcastEntry, PodcastListResponse } from '../types/podcast-list'

type AllOriginsGetResponse = {
	contents: string
}

export const useFetchPodcastList = () => {
	const [podcastListValueInLocaleStorage, setPodcastListValueInLocaleStorage] =
		useLocalStorage<PodcastListLocalStorage | null>(PODCAST_LIST_LOCAL_STORAGE_KEY, null)
	const [data, setData] = useState<PodcastEntry[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const { loadingData, finishLoadingData } = useLoadingStore(
		({ loadingData, finishLoadingData }) => ({
			loadingData,
			finishLoadingData,
		})
	)

	useEffect(() => {
		loadingData()
		const abortController = new AbortController()
		const timeoutId = window.setTimeout(() => abortController.abort(), 20000)

		let shouldRefetch = false
		if (podcastListValueInLocaleStorage) {
			shouldRefetch = hasMoreTimePassedSinceThisDate({
				date: podcastListValueInLocaleStorage.lastFetch,
				converter: 'days',
				passedTime: 1,
			})
			if (!shouldRefetch) {
				window.clearTimeout(timeoutId)
				finishLoadingData()
				setIsLoading(false)
				setData(podcastListValueInLocaleStorage.list)
				return
			}
		}

		const podcastListToFetchUrl = encodeURIComponent(PODCAST_LIST_URL)
		fetch(`${BASE_URL}${podcastListToFetchUrl}`, { signal: abortController.signal })
			.then((response) => {
				if (!response.ok) {
					throw Error('could not fetch the data for that resource')
				}
				return response.json()
			})
			.then((data: AllOriginsGetResponse) => {
				const raw = JSON.parse(data.contents) as PodcastListResponse
				const list = raw.feed.entry
				setData(list)
				setError(null)
				setPodcastListValueInLocaleStorage({
					lastFetch: new Date().toString(),
					list,
				})
			})
			.catch((err) => {
				console.log('🦊 err', err)
				setError(err?.name === 'AbortError' ? 'request timed out' : err.message)
			})
			.finally(() => {
				window.clearTimeout(timeoutId)
				finishLoadingData()
				setIsLoading(false)
			})
	}, [])

	return { data, isLoading, error }
}
