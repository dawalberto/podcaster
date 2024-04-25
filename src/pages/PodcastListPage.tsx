import { PodcastCard, SearchInput } from '../components'
import { usePodcastList } from '../hooks'

export const PodcastListPage = () => {
	const { podcastList, isLoading, error, handleOnSearch } = usePodcastList()

	return (
		<div>
			{isLoading && <div>Loading podcasts...</div>} {/* // TODO - skeleton */}
			{error && <div>{error}</div>} {/* // TODO - Error component */}
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
		</div>
	)
}
