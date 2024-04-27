import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { PODCAST_LIST_LOCAL_STORAGE_KEY, PodcastListLocalStorage } from '../../shared'

export const useGetPodcastDescription = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const [podcastListValueInLocaleStorage] = useLocalStorage<PodcastListLocalStorage | null>(
		PODCAST_LIST_LOCAL_STORAGE_KEY,
		null
	)

	const podcastDescription = (() => {
		if (!podcastListValueInLocaleStorage) return

		const podcastList = podcastListValueInLocaleStorage.list.find(
			({ id }) => id.attributes['im:id'] === podcastId
		)

		return podcastList?.summary.label
	})()

	return podcastDescription
}
