import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Episodes } from '../components/Episodes'
import { EpisodesSkeleton } from '../components/EpisodesSkeleton'
import { PodcastHelmet } from '../components/PodcastHelmet'
import { PodcastInfo } from '../components/PodcastInfo'
import { PodcastInfoSkeleton } from '../components/PodcastInfoSkeleton'
import { useFetchPodcastDetails } from '../hooks/useFetchPodcastDetails'
import useGetPodcastFromList from '../hooks/useGetPodcastFromList'

export const PodcastPage = () => {
	const { data, error } = useFetchPodcastDetails()
	const { podcastFromList } = useGetPodcastFromList()
	const { details, episodes } = data ?? {}
	const podcastInfoDetails = useMemo(() => {
		if (details) {
			return details
		}
		return podcastFromList
	}, [details, podcastFromList])

	if (error) {
		return <div>{error}</div>
	}

	return (
		<motion.main
			initial={{ opacity: 0, x: '-100%' }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 1.2 }}
		>
			{details && <PodcastHelmet details={details} />}
			<section className='flex flex-col gap-10 md:flex-row'>
				{podcastInfoDetails ? (
					<PodcastInfo details={podcastInfoDetails} />
				) : (
					<PodcastInfoSkeleton />
				)}
				{details && episodes ? (
					<Episodes episodes={episodes} trackCount={details.trackCount} />
				) : (
					<EpisodesSkeleton />
				)}
			</section>
		</motion.main>
	)
}
