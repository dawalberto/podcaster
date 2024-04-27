import { PodcastInfo } from '../components/PodcastInfo'
import { useFetchPodcastDetails } from '../hooks/useFetchPodcastDetails'

export const PodcastPage = () => {
	const { data, isLoading, error } = useFetchPodcastDetails()
	const { details, episodes } = data ?? {}

	return (
		<div>
			{isLoading && <h1>Loading details...</h1>}
			{error && <h1>{error}</h1>}
			<section className='flex'>
				{details && <PodcastInfo details={details} />}
				<div className='grow'></div>
			</section>
			{episodes && <pre>EPISODES: {JSON.stringify(episodes, null, 2)}</pre>}
		</div>
	)
}
