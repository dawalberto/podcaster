import { useMemo } from 'react'
import { Transition } from '../../shared/components/Transition'
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
		<Transition>
			<>
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
			</>
		</Transition>
	)
}
