import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
	BASE_RAW_URL,
	hasMoreTimePassedSinceThisDate,
	PODCAST_LIST_LOCAL_STORAGE_KEY,
	PODCAST_LIST_URL,
	PodcastListLocalStorage,
	useLoadingStore,
} from '../../shared'
import { PodcastEntry, PodcastListResponse } from '../types/podcast-list'

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
		let shouldRefetch = false
		if (podcastListValueInLocaleStorage) {
			shouldRefetch = hasMoreTimePassedSinceThisDate({
				date: podcastListValueInLocaleStorage.lastFetch,
				converter: 'days',
				passedTime: 1,
			})
			if (!shouldRefetch) {
				finishLoadingData()
				setIsLoading(false)
				setData(podcastListValueInLocaleStorage.list)
				return
			}
		}

		fetch(`${BASE_RAW_URL}${PODCAST_LIST_URL}`)
			.then((response) => {
				if (!response.ok) {
					throw Error('could not fetch the data for that resource')
				}
				return response.json()
			})
			.then((data: PodcastListResponse) => {
				const list = data.feed.entry
				setData(list)
				setError(null)
				setPodcastListValueInLocaleStorage({
					lastFetch: new Date().toString(),
					list,
				})
			})
			.catch((err) => {
				console.log('🦊 err', err)
				setError(err.message)
			})
			.finally(() => {
				finishLoadingData()
				setIsLoading(false)
			})
	}, [])

	return { data, isLoading, error }
}
