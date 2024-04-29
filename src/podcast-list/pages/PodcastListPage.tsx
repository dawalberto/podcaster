import { motion } from 'framer-motion'
import { SearchInput } from '../../shared'
import { PodcastCard } from '../components/PodcastCard'
import { PodcastListHelmet } from '../components/PodcastListHelmet'
import { PodcastListSkeleton } from '../components/PodcastListSkeleton'
import { usePodcastList } from '../hooks/usePodcastList'

export const PodcastListPage = () => {
	const { podcastList, isLoading, error, handleOnSearch } = usePodcastList()

	if (isLoading) {
		return <PodcastListSkeleton />
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.2 }}
		>
			<PodcastListHelmet />
			{podcastList && (
				<>
					<div className='flex items-center justify-end gap-2'>
						<span className='flex-none rounded-md bg-sky-700 px-1.5 py-0 font-semibold text-white'>
							{podcastList.length}
						</span>
						<SearchInput onSearch={handleOnSearch} />
					</div>
					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-24 md:grid-cols-3 md:gap-y-32 lg:grid-cols-4'>
						{podcastList.map((podcast) => (
							<PodcastCard key={podcast.id.attributes['im:id']} podcast={podcast} />
						))}
					</div>
				</>
			)}
		</motion.main>
	)
}
