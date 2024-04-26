import { useFetchPodcastDetails } from '../hooks'

export const PodcastPage = () => {
	const { data, isLoading, error } = useFetchPodcastDetails()
	const { details, episodes } = data ?? {}

	return (
		<div>
			{isLoading && <h1>Loading details...</h1>}
			{error && <h1>{error}</h1>}
			{details && <pre>DETAILS: {JSON.stringify(details, null, 2)}</pre>}
			{episodes && <pre>EPISODES: {JSON.stringify(episodes, null, 2)}</pre>}
		</div>
	)
}
