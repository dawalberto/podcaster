import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PodcastInfo } from '../../podcast-details/components/PodcastInfo'
import { useFetchPodcastDetails } from '../../podcast-details/hooks/useFetchPodcastDetails'
import { Episode } from '../components/Episode'

export const EpisodePage = () => {
	const { episodeId } = useParams()
	const { data, isLoading, error } = useFetchPodcastDetails()
	const { details, episodes } = data ?? {}

	const episode = useMemo(
		() => episodes?.find(({ trackId }) => trackId === Number(episodeId)),
		[episodeId, episodes]
	)

	return (
		<div>
			{isLoading && <h1>Loading episode details...</h1>}
			{error && <h1>{error}</h1>}
			<section className='flex flex-col gap-10 md:flex-row'>
				{details && <PodcastInfo details={details} />}
				{episode && <Episode episode={episode} />}
			</section>
		</div>
	)
}
