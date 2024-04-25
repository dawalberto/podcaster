import { SearchInput } from '../components'
import { usePodcastList } from '../hooks'

export const PodcastListPage = () => {
	const { podcastList, isLoading, error, handleOnSearch } = usePodcastList()

	return (
		<div>
			{isLoading && <div>Loading podcasts...</div>}
			{error && <div>{error}</div>}
			{podcastList && (
				<div>
					<div className='flex items-center justify-end gap-2'>
						<span className='rounded-md bg-sky-700 px-1.5 py-0 font-semibold text-white'>
							{podcastList.length}
						</span>
						<SearchInput onSearch={handleOnSearch} />
					</div>
					<code>
						<pre>{JSON.stringify(podcastList, null, 2)}</pre>
					</code>
				</div>
			)}
		</div>
	)
}
