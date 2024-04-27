import { Episodes } from '../components/Episodes'
import { PodcastInfo } from '../components/PodcastInfo'
import { useFetchPodcastDetails } from '../hooks/useFetchPodcastDetails'

export const PodcastPage = () => {
	const { data, isLoading, error } = useFetchPodcastDetails()
	const { details, episodes } = data ?? {}

	return (
		<div>
			{isLoading && <h1>Loading details...</h1>}
			{error && <h1>{error}</h1>}
			<section className='flex flex-col gap-10 md:flex-row'>
				{details && <PodcastInfo details={details} />}
				{episodes && <Episodes episodes={episodes} />}
			</section>
		</div>
	)
}
