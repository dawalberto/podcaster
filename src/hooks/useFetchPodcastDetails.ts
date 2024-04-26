import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, hasMoreTimePassedSinceThisDate, PODCAST_DETAILS_URL } from '../shared'
import {
	PodcastDetails,
	PodcastDetailsData,
	PodcastDetailsLocalStorage,
	PodcastDetailsResponse,
	PodcastEpisode,
} from '../shared/types'
import { useDetailsDataInLocalStorage } from './useDetailsDataInLocalStorage'
import { useGetPodcastDescription } from './useGetPodcastDescription'

export const useFetchPodcastDetails = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const podcastToFetchUrl = encodeURIComponent(
		`${PODCAST_DETAILS_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=2`
	)
	const { data: dataInLS, setData: setDataInLS } = useDetailsDataInLocalStorage()
	const [data, setData] = useState<Omit<PodcastDetailsLocalStorage, 'lastFetch'> | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const podcastDescription = useGetPodcastDescription()

	useEffect(() => {
		let shouldRefetch = false
		if (dataInLS) {
			shouldRefetch = hasMoreTimePassedSinceThisDate({
				date: dataInLS.lastFetch,
				converter: 'minutes',
				passedTime: 30,
			})
			if (!shouldRefetch) {
				setIsLoading(false)
				setData({
					details: dataInLS.details,
					episodes: dataInLS.episodes,
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
					details: { description: podcastDescription, ...podcastDetails },
					episodes: podcastEpisodes,
				})
				setError(null)
				setDataInLS({
					lastFetch: new Date().toString(),
					details: { description: podcastDescription, ...podcastDetails },
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
