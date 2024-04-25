import { useFetchPodcastList } from '../hooks/useFetchPodcastList'

export const PodcastListPage = () => {
	const { data: podcastList, isLoading, error } = useFetchPodcastList()

	return (
		<div>
			{isLoading && <div>Loading podcasts...</div>}
			{error && <div>{error}</div>}
			{podcastList && (
				<code>
					<pre>{JSON.stringify(podcastList, null, 2)}</pre>
				</code>
			)}
		</div>
	)
}
