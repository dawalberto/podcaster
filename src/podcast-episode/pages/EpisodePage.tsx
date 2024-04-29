import { motion } from 'framer-motion'
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

	if (isLoading) {
		return <PodcastEpisodeSkeleton />
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<>
			{details && episode && <EpisodeHelmet details={details} episode={episode} />}
			<section className='flex flex-col gap-10 md:flex-row'>
				{details && <PodcastInfo details={details} />}
				<motion.main
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1.2 }}
				>
					{episode && <Episode episode={episode} />}
				</motion.main>
			</section>
		</>
	)
}
