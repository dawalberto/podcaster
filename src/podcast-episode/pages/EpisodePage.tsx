import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PodcastInfo } from '../../podcast-details/components/PodcastInfo'
import { useFetchPodcastDetails } from '../../podcast-details/hooks/useFetchPodcastDetails'
import { Episode } from '../components/Episode'
import { EpisodeHelmet } from '../components/EpisodeHelmet'
import { PodcastEpisodeSkeleton } from '../components/EpisodeSkeleton'

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
			{isLoading && <PodcastEpisodeSkeleton />}
			{error && <h1>{error}</h1>}
			{details && episode && <EpisodeHelmet details={details} episode={episode} />}
			<section className='flex flex-col gap-10 md:flex-row'>
				{details && <PodcastInfo details={details} />}
				{episode && <Episode episode={episode} />}
			</section>
		</div>
	)
}
