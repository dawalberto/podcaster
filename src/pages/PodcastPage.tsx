import { useFetchPodcastDetails } from '../hooks'

export const PodcastPage = () => {
	const { data, isLoading, error } = useFetchPodcastDetails()

	return (
		<div>
			{isLoading && <h1>Loading details...</h1>}
			{error && <h1>{error}</h1>}
			{data?.details && <pre>DETAILS: {JSON.stringify(data.details, null, 2)}</pre>}
			{data?.episodes && <pre>EPISODES: {JSON.stringify(data.episodes, null, 2)}</pre>}
		</div>
	)
}
