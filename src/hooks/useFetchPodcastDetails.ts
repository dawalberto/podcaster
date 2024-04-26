import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { BASE_URL, hasMoreTimePassedSinceThisDate, PODCAST_DETAILS_URL } from '../shared'
import {
	PodcastDetails,
	PodcastDetailsData,
	PodcastDetailsLocalStorage,
	PodcastDetailsLocalStorageKey,
	PodcastDetailsResponse,
	PodcastEpisode,
} from '../shared/types'

export const useFetchPodcastDetails = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const podcastToFetchUrl = encodeURIComponent(
		`${PODCAST_DETAILS_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=2`
	)
	const id = Number(podcastId)
	const localStorageDetailsKey: PodcastDetailsLocalStorageKey<typeof id> = `podcast${id}Details`
	const [dataInLocaleStorage, setDataInLocaleStorage] =
		useLocalStorage<PodcastDetailsLocalStorage | null>(localStorageDetailsKey, null)
	const [data, setData] = useState<Omit<PodcastDetailsLocalStorage, 'lastFetch'> | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let shouldRefetch = false
		if (dataInLocaleStorage) {
			shouldRefetch = hasMoreTimePassedSinceThisDate({
				date: dataInLocaleStorage.lastFetch,
				converter: 'minutes',
				passedTime: 5,
			})
			if (!shouldRefetch) {
				setIsLoading(false)
				setData({
					details: dataInLocaleStorage.details,
					episodes: dataInLocaleStorage.episodes,
				})
				return
			}
		}

		fetch(BASE_URL + podcastToFetchUrl)
			.then((response) => {
				console.log('🦊 response', response)
				if (!response.ok) {
					throw Error('could not fetch the data for that resource')
				}
				return response.json()
			})
			.then((data: PodcastDetailsResponse) => {
				console.log('🦊 data', data)
				const podcastAndEpisodes = JSON.parse(data.contents) as PodcastDetailsData
				const podcastDetails = podcastAndEpisodes.results.find(
					({ wrapperType }) => wrapperType === 'track'
				) as PodcastDetails
				const podcastEpisodes = podcastAndEpisodes.results.filter(
					({ wrapperType }) => wrapperType === 'podcastEpisode'
				) as PodcastEpisode[]

				setData({
					details: podcastDetails,
					episodes: podcastEpisodes,
				})
				setError(null)
				setDataInLocaleStorage({
					lastFetch: new Date().toString(),
					details: podcastDetails,
					episodes: podcastEpisodes,
				})
			})
			.catch((err) => {
				console.log('🦊 err', err)
				setError(err.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return { data, isLoading, error }
}
