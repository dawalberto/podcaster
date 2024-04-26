import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks'
import {
	PODCAST_DETAILS_URL,
	PodcastDetails,
	PodcastDetailsData,
	PodcastDetailsResponse,
	PodcastEpisode,
} from '../shared'

export const PodcastPage = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const podcastToFetchUrl = encodeURIComponent(
		`${PODCAST_DETAILS_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=14`
	)
	const { data, isLoading, error } = useFetch<PodcastDetailsResponse>(podcastToFetchUrl)
	const [details, setDetails] = useState<PodcastDetails>()
	const [episodes, setEpisodes] = useState<PodcastEpisode[]>()

	useEffect(() => {
		if (data) {
			const podcastAndEpisodes = JSON.parse(data.contents) as PodcastDetailsData

			// TODO - type guard
			const podcastDetails = podcastAndEpisodes.results.find(
				({ wrapperType }) => wrapperType === 'track'
			) as PodcastDetails
			const podcastEpisodes = podcastAndEpisodes.results.filter(
				({ wrapperType }) => wrapperType === 'podcastEpisode'
			) as PodcastEpisode[]
			setDetails(podcastDetails)
			setEpisodes(podcastEpisodes)
		}
	}, [data])

	return (
		<div>
			{isLoading && <h1>Loading details...</h1>}
			{error && <h1>{error}</h1>}
			{details && <pre>DETAILS: {JSON.stringify(details, null, 2)}</pre>}
			{episodes && <pre>EPISODES: {JSON.stringify(episodes, null, 2)}</pre>}
		</div>
	)
}
