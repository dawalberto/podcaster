import { Episodes } from '../components/Episodes'
import { PodcastDetailsSkeleton } from '../components/PodcastDetailsSkeleton'
import { PodcastInfo } from '../components/PodcastInfo'
import { useFetchPodcastDetails } from '../hooks/useFetchPodcastDetails'

export const PodcastPage = () => {
	const { data, isLoading, error } = useFetchPodcastDetails()
	const { details, episodes } = data ?? {}

	return (
		<div>
			{isLoading && <PodcastDetailsSkeleton />}
			{error && <h1>{error}</h1>}
			<section className='flex flex-col gap-10 md:flex-row'>
				{details && <PodcastInfo details={details} />}
				{episodes && <Episodes episodes={episodes} />}
			</section>
		</div>
	)
}
