import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
	hasMoreTimePassedSinceThisDate,
	PODCAST_DETAILS_URL,
	PodcastDetailsLocalStorage,
	useLoadingStore,
} from '../../shared'
import {
	PodcastDetails,
	PodcastDetailsData,
	PodcastEpisode,
} from '../types/podcast-details'
import { useDetailsDataInLocalStorage } from './useDetailsDataInLocalStorage'

export const useFetchPodcastDetails = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const podcastUrl = `${PODCAST_DETAILS_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
	const { data: dataInLS, setData: setDataInLS } = useDetailsDataInLocalStorage()
	const [data, setData] = useState<Omit<PodcastDetailsLocalStorage, 'lastFetch'> | null>(null)
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
		if (dataInLS) {
			shouldRefetch = hasMoreTimePassedSinceThisDate({
				date: dataInLS.lastFetch,
				converter: 'days',
				passedTime: 1,
			})
			if (!shouldRefetch) {
				finishLoadingData()
				setIsLoading(false)
				setData({
					details: dataInLS.details,
					episodes: dataInLS.episodes,
				})
				return
			}
		}

		fetch(podcastUrl)
			.then((response) => {
				if (!response.ok) {
					throw Error('could not fetch the data for that resource')
				}
				return response.json() as Promise<PodcastDetailsData>
			})
			.then((podcastAndEpisodes) => {
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
				setDataInLS({
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
				finishLoadingData()
				setIsLoading(false)
			})
	}, [])

	return { data, isLoading, error }
}
